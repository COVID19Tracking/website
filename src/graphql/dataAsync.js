let fetch = require('cross-fetch');
let luxon = require('luxon');
let promiseProps = require('promise-props');

// TODO: Make this smarter so that we don't always 
// fetch all the data we might ever need before serving
// a query. We should fetch on demand based on the 
// things that the query requires, then keep that 
// in something like a DataLoader so that we don't 
// refetch it.
//
// The approach we have implemented here is not great
// but is better than a lot of things might be since
// it fetches everything in parallel as soon as any 
// data is needed, and then keeps all of that around
// for the lifetime of the request

let Data = null;

async function getJSONAsync(url) {
  let response = await fetch(url);
  return await response.json();
}

function rawDayToJSDate(rawDay) {
  // The `rawDay` value is typically an int not a string, of a form like 20200317
  try {
    return luxon.DateTime.fromFormat(rawDay + '', 'yyyyMMdd').toJSDate();
  } catch (e) {
    console.error(`Failed to parse raw day '${rawDay}'`);
    return null;
  }
}

function rawWeirdEasternTimeToJSDate(rawDateTimeStr) {
  // For things like '3/17 00:01'
  try {
    return luxon.DateTime.fromFormat(rawDateTimeStr, 'M/d HH:mm', { zone: 'America/New_York' });
  } catch (e) {
    console.error(`Failed to parse raw ET datetime '${rawDateTimeStr}'`);
    return null;
  }
}

function rawToDataPoint(raw) {
  let dataPoint = {
    positives: raw.positive,
    negatives: raw.negative,
    positivesPlusNegatives: raw.posNeg,
    pending: raw.pending,
    deaths: raw.death,
    total: raw.total,
  };
  if (raw.date) {
    dataPoint.date = rawDayToJSDate(raw.date);
  }
  if (raw.states) {
    dataPoint.statesReporting = raw.states;
  }
  if (raw.state) {
    dataPoint.__stateAbbrev = raw.state;
  }
  if (raw.lastUpdateEt) {
    dataPoint.lastUpdated = rawWeirdEasternTimeToJSDate(raw.lastUpdateEt);
  }
  if (raw.checkTimeEt) {
    dataPoint.lastChecked = rawWeirdEasternTimeToJSDate(raw.checkTimeEt);
  }
  return dataPoint;
}

async function usDailyDataAsync() {
  // let raw = await getJSONAsync('https://covid.cape.io/us/daily');
  let raw = await getJSONAsync('https://covidtracking.com/api/v1/us/daily.json');
  let usDailyData = [];
  for (day of raw) {
    usDailyData.push(rawToDataPoint(day));
  }
  return usDailyData;
}

function rawStateInfoToState(raw) {
  return {
    abbrev: raw.state,
    name: raw.name,
    dataSite: raw.dataSite,
    covid19Site: raw.covid19Site,
    twitter: raw.twitter,
    puiReporting: mapPUI(raw.pui),
    pumReporting: raw.pum,
    notes: raw.notes,
  };
}

async function stateInfoDataAsync() {
  // let raw = await getJSONAsync('https://covid.cape.io/states/info');
  let raw = await getJSONAsync('https://covidtracking.com/api/v1/states/info.json');
  let stateInfoData = {};
  for (state of raw) {
    // {"state":"AK","dataSite":"http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/monitoring.aspx","covid19Site":"http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.aspx","twitter":"@Alaska_DHSS","pui":"All data","pum":false,"notes":"Unclear if they mean \"persons tested\" or \"specimens tested.\" We count them as \"persons tested\" for now.","name":"Alaska"}
    stateInfoData[state.state] = rawStateInfoToState(state);
  }
  return stateInfoData;
}

function mapPUI(input) {
  let inputLower = (input + '').toLowerCase();
  let x = {
    'all data': 'ALL_DATA',
    'no data': 'NO_DATA',
    'only positives': 'ONLY_POSITIVES',
    'positives + negatives': 'POSITIVES_AND_NEGATIVES',
    'postivies only': 'ONLY_POSITIVES',
  }[inputLower];
  return x || 'UKNOWN';
}

async function usTotalDataAsync() {
  // let raw = await getJSONAsync('https://covid.cape.io/us');
  let raw = await getJSONAsync('https://covidtracking.com/api/v1/us/current.json');

  let usTotalData = rawToDataPoint(raw[0]);
  return usTotalData;
}

async function statesDataAsync() {
  // let raw = await getJSONAsync('https://covid.cape.io/states');
  let raw = await getJSONAsync('https://covidtracking.com/api/v1/states/current.json');
  let statesData = {};
  for (let stateData of raw) {
    let dataPoint = rawToDataPoint(stateData);
    statesData[dataPoint.__stateAbbrev] = dataPoint;
  }
  return statesData;
}

async function refreshAsync() {
  // TODO: Handle the failure case where this doesn't get updated in some reasonable
  // way. Maybe some kind of exponential backoff?

  // Use `America/New_York` because the project mostly uses Eastern Time for times
  let _updated = luxon.DateTime.local().setZone('America/New_York');
  let newData = await promiseProps({
    usDaily: usDailyDataAsync(),
    stateInfo: stateInfoDataAsync(),
    usTotal: usTotalDataAsync(),
    statesData: statesDataAsync(),
  });
  newData._updated = _updated;
  Data = newData;
  return {
    success: true,
    updatedDateTime: _updated,
  };
}

async function dataAsync() {
  if (Data === null) {
    await refreshAsync();
  }
  return Data;
}

module.exports = dataAsync;

Object.assign(module.exports, {
  refreshAsync,
  rawDayToJSDate,
});

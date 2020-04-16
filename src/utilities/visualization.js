import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

export const formatDate = timeFormat('%b %e')
export const formatNumber = format(',.0f')
export const parseDate = timeParse('%Y%m%d')

export const getStateName = abbr => {
  const names = {
    AK: 'Alaska',
    AL: 'Alabama',
    AR: 'Arkansas',
    AS: 'American Samoa',
    AZ: 'Arizona',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'Washington, DC',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    IA: 'Iowa',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    MA: 'Massachusets',
    MD: 'Maryland',
    ME: 'Maine',
    MI: 'Michigan',
    MN: 'Minnesota',
    MO: 'Missouri',
    MP: 'Northern Mariana Islands',
    MS: 'Mississippi',
    MT: 'Montana',
    NC: 'North Carolina',
    ND: 'North Dakota',
    NE: 'Nebraska',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NV: 'Nevada',
    NY: 'New York',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VA: 'Virginia',
    VI: 'Virgin Islands',
    VT: 'Vermont',
    WA: 'Washington',
    WI: 'Wisconsin',
    WV: 'West Virginia',
    WY: 'Wyoming',
  }
  return names[abbr] || abbr
}

export const totalColor = '#585BC1'
export const positiveColor = '#FFA270'
export const deathsBarColor = '#4C5559'

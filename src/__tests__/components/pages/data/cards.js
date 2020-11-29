import React from 'react'
import renderer from 'react-test-renderer'
import CasesCard from '~components/pages/data/cards/cases-card'
import HospitalizationCard from '~components/pages/data/cards/hospitalization-card'
import OutcomesCard from '~components/pages/data/cards/outcomes-card'
import AntibodyCard from '~components/pages/data/cards/tests-antibody'
import NationalTestsCard from '~components/pages/data/cards/tests-national'
import ViralTestsCard from '~components/pages/data/cards/tests-viral'
import LongTermCareCard from '~components/pages/data/cards/long-term-care'

import CrdtCasesCard from '~components/pages/data/cards/crdt/cases-card'
import CrdtDeathsCard from '~components/pages/data/cards/crdt/deaths-card'

import DefaultSmallCard from '~components/pages/data/cards/small'
import DataAsGraphicSmallCard from '~components/pages/data/cards/small/data-as-graphic-small-card'
import ViewRacialDataSmallCard from '~components/pages/data/cards/small/view-racial-data-small-card'
import GradeSmallCard from '~components/pages/data/cards/small/grade-small-card'

describe('Components : Pages : Data : Cards : Cases', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CasesCard
          stateSlug="california"
          positive={13}
          positiveIncrease={14}
          sevenDayIncrease={17.3}
          probableCases={4}
          confirmedCases={5}
          national={false}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const nationalTree = renderer
      .create(
        <CasesCard
          positive={13}
          positiveIncrease={14}
          sevenDayIncrease={17.3}
          national
        />,
      )
      .toJSON()
    expect(nationalTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Hospitalization', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <HospitalizationCard
          stateSlug="california"
          hospitalizedCumulative={4}
          inIcuCumulative={5}
          onVentilatorCumulative={10}
          hospitalizedCurrently={14}
          inIcuCurrently={13}
          onVentilatorCurrently={15}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const nationalTree = renderer
      .create(
        <HospitalizationCard
          stateSlug="california"
          hospitalizedCumulative={4}
          inIcuCumulative={5}
          onVentilatorCumulative={10}
          hospitalizedCurrently={14}
          inIcuCurrently={13}
          onVentilatorCurrently={15}
          national
        />,
      )
      .toJSON()
    expect(nationalTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Outcomes', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <OutcomesCard
          stateSlug="california"
          deathsLabel="Deaths"
          death={45}
          deathConfirmed={15}
          deathProbable={10}
          recovered={14}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const nationalTree = renderer
      .create(
        <OutcomesCard
          stateSlug="california"
          deathsLabel="Deaths"
          death={45}
          deathConfirmed={15}
          deathProbable={10}
          recovered={14}
          national
        />,
      )
      .toJSON()
    expect(nationalTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Antibody tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AntibodyCard
          stateSlug="california"
          totalTestsAntibody={14}
          totalTestsPeopleAntibody={12}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : National tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NationalTestsCard
          totalTestResults={14000}
          totalTestResultsIncrease={1400}
          totalTestResulstPercentIncrease={13.4}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Viral tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ViralTestsCard
          stateSlug="california"
          totalTestEncountersViral={15}
          totalTestsViral={16}
          totalTestsPeopleViral={16}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeUnknownUnits = renderer
      .create(
        <ViralTestsCard
          stateSlug="california"
          totalTestEncountersViral={15}
          totalTestsViral={16}
          totalTestsPeopleViral={16}
          unknownUnits
        />,
      )
      .toJSON()
    expect(treeUnknownUnits).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Long term care card', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <LongTermCareCard
          data={{
            current: {
              total_cases: 1200,
              total_death: 300,
              outbrkfac_alf: null,
              outbrkfac_ltc: null,
              outbrkfac_other: null,
              outbrkfac_nh: null,
              date: 20201112,
            },
            last: { total_cases: 1000, total_death: 200, date: 20201105 },
          }}
          stateName="Texas"
          stateSlug="texas"
          stateDeaths={2400}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : CRDT : Cases', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CrdtCasesCard
          stateAbbreviation="NV"
          raceData={{
            values: [
              {
                name: 'American Indian/Alaska Native',
                deathsValue: 4.3,
                casesValue: 89,
                suffix: ' ',
              },
              {
                name: 'Asian',
                deathsValue: 'N/A',
                casesValue: 120,
                suffix: '*',
              },
            ],
            hasDeaths: true,
            hasCases: true,
            hasAsterisk: true,
            lastCheckDate: '20201119',
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    const treeNoData = renderer
      .create(
        <CrdtCasesCard
          stateAbbreviation="NV"
          raceData={{
            values: [],
            hasDeaths: false,
            hasCases: false,
            hasAsterisk: false,
            lastCheckDate: '20201119',
          }}
        />,
      )
      .toJSON()
    expect(treeNoData).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : CRDT : Deaths', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CrdtDeathsCard
          stateAbbreviation="NV"
          raceData={{
            values: [
              {
                name: 'American Indian/Alaska Native',
                deathsValue: 4.3,
                casesValue: 89,
                asterisk: false,
              },
              {
                name: 'Asian',
                deathsValue: 'N/A',
                casesValue: 120,
                asterisk: '*',
              },
            ],
            hasDeaths: true,
            hasCases: true,
            lastCheckDate: '20201119',
            hasAsterisk: true,
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeNoData = renderer
      .create(
        <CrdtDeathsCard
          stateAbbreviation="NV"
          raceData={{
            values: [],
            hasDeaths: false,
            hasCases: false,
            hasAsterisk: false,
            lastCheckDate: '20201119',
          }}
        />,
      )
      .toJSON()
    expect(treeNoData).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Small Cards', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DefaultSmallCard stateAbbreviation="NY" destination="/race/">
          <p>child</p>
        </DefaultSmallCard>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly', () => {
    const externalTree = renderer
      .create(
        <DefaultSmallCard
          stateAbbreviation="NY"
          destination="https://www.theatlantic.com/"
          isInternal={false}
        >
          <p>child</p>
        </DefaultSmallCard>,
      )
      .toJSON()
    expect(externalTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Small Cards : View data as graphic', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DataAsGraphicSmallCard stateAbbreviation="NY" ignoreStates={[]} />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Small Cards : Grade', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GradeSmallCard grade="b" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Data : Cards : Small Cards : View racial data', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ViewRacialDataSmallCard stateAbbreviation="KS" ignoreStates={[]} />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

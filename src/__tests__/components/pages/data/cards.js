import React from 'react'
import renderer from 'react-test-renderer'
import CasesCard from '~components/pages/data/cards/cases-card'
import HospitalizationCard from '~components/pages/data/cards/hospitalization-card'
import OutcomesCard from '~components/pages/data/cards/outcomes-card'
import AntibodyCard from '~components/pages/data/cards/tests-antibody'
import NationalTestsCard from '~components/pages/data/cards/tests-national'
import ViralTestsCard from '~components/pages/data/cards/tests-viral'

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
      .create(<AntibodyCard stateSlug="california" totalTestsAntibody={14} />)
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

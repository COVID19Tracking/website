import React from 'react'
import Layout from '~components/layout'
import Container from '~components/common/container'
import HHSFacilitiesMap from '~components/pages/data/hhs-facilities/map'

const StateHHSHospitalization = () => {
  return (
    <Layout
      title="Hospital facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      showWarning
      noContainer
    >
      <Container centered>
        <p>
          In December, tThe Department of Health and Human Services (HHS)
          released a facility-level dataset about hospital utilization, and
          capacity, and COVID-19 patients. This is the most detailed data ever
          made available on how COVID-19 is affecting American hospitals. This
          data is much more granular than what the COVID Tracking Project has
          been able to compile from state data, though in aggregate, it matches
          our numbers. So, we’re presenting it here.
        </p>
        <p>
          The HHS data comes either directly from hospitals or through state
          public health agencies and hospital associations that aggregate this
          data. It is submitted directly into the HHS Protect system or via a
          portal run by the company TeleTracking. To learn more about the
          facility-level dataset, see our analysis. For more granular
          information, see this community FAQ page. For data definitions and to
          send feedback, see the HHS page for this dataset.
        </p>
      </Container>
      <HHSFacilitiesMap center={[-97, 38]} zoom={4} />

      <Container centered>
        <p>
          In addition to being granular, the HHS dataset also presents metrics
          that were not available from states. Most importantly, we can see
          hospital capacity—or, what share of available beds in a hospital are
          currently occupied by patients—as well as new admissions of COVID-19
          patients and demographic breakdowns of patient counts. , new
          admissions of COVID-19 patients, and staffing shortages. Hospital
          capacity and a similar metric, intensive care unit (ICU) capacity, can
          indicate whether a particular hospital or region is becoming
          overwhelmed. When a hospital reaches 90% capacity, or 9 out of 10
          available beds full, staff may be unable to devote necessary time and
          resources to individual patients.
        </p>
        <p>
          The COVID Tracking Project has visualized hospital capacity and
          COVID-19 patients at individual facilities. Bubble size corresponds to
          the total number of COVID-19 patients at each hospital while bubble
          color corresponds to the share of all inpatient beds which are
          occupied by COVID-19 patients. The HHS counts include both confirmed
          and suspected COVID-19 cases.
        </p>
        <p>
          This dataset is updated weekly on Mondays, including data for the
          preceding Friday to Thursday.
        </p>
      </Container>
    </Layout>
  )
}

export default StateHHSHospitalization

import React from 'react'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'

const ImpactFormPage = () => (
  <Layout
    title="Help Us Track Our Impact"
    socialCard={{
      description:
        'If you’ve used data or analyses from COVID Tracking Project over the past 11 months, please let us know how you used our work.',
    }}
    centered
  >
    <LongContent>
      <p>
        If you’ve used data or analyses from COVID Tracking Project over the
        past 11 months, please let us know how you used our work, how it helped
        you, and anything else you’d like us to know about what the project has
        meant to you. Please fill out the form below. Your response is
        confidential, and we won’t publish anything identifiable without your
        permission.
      </p>
      <p>
        <strong>
          This form has been taken offline. Thank you for your interest. If you
          would like to contact us, please <Link to="/contact">reach out</Link>.
        </strong>
      </p>
    </LongContent>
  </Layout>
)

export default ImpactFormPage

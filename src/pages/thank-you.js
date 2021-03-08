import React from 'react'
import Layout from '~components/layout'
import ThankYou from '~components/pages/thank-you'

const ThankYouPage = () => (
  <Layout title="Thank You to Our Volunteers">
    <h2>Our volunteers</h2>
    <p>
      Every day for a year, hundreds of COVID Tracking Project contributors from
      all walks of life compiled, published, and interpreted vitally important
      COVID-19 data as a service to their fellow Americans. We offer thanks and
      heartfelt gratitude for their labor and sacrifice.
    </p>
    <ThankYou />
  </Layout>
)

export default ThankYouPage

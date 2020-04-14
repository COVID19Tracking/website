import React from 'react'
import Layout from '../../components/layout'
import ContactForm from '../../components/common/contact-form'

const ContactAccessibilityPage = () => (
  <Layout title="Contact us &mdash; Accessibility">
    <div>
      Please fill out the form below to contact us about accessibility issues.
      All fields are required.
    </div>
    <ContactForm messageCopy="What accessibility problems are you experiencing?" />
  </Layout>
)

export default ContactAccessibilityPage

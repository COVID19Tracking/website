import React from 'react'
import Layout from '../../components/layout'
import ContactForm from '../../components/common/contact-form'

const ContactAccessibilityPage = () => (
  <Layout title="Contact us &mdash; Accessibility">
    <div>
      Please fill out the form below to contact us about accessibility issues.
      All fields are required. We try to respond to feedback within 5 business
      days, and to propose a solution within 10 business days.
    </div>
    <ContactForm
      name="accessibility"
      messageCopy="What accessibility problems are you experiencing?"
    />
  </Layout>
)

export default ContactAccessibilityPage

import React from 'react'
import withLocation from '~components/utils/with-location'
import Layout from '~components/layout'

const ContactErrorPage = withLocation(({ search }) => (
 
    var a = " !!! Something went Wrong, TRY AGAIN " ;
        alert(a);
  <Layout title="Sorry" centered>
    <h2>Sorry!</h2>
    <p>There was an error submitting your form, please try again.</p>
    {search.message && <p>{search.message}</p>}
  </Layout>

export default ContactErrorPage

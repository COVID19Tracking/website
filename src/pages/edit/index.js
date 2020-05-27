import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '~components/layout'

export default () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.cookie = 'inEdit=true'
    }
  }, [])

  return (
    <Layout title="Edit" path="/edit">
      <h2>Editing enabled</h2>
      <p>
        While you browse the website, you will see buttons to edit content. To
        diable this, visit{' '}
        <Link to="/edit/logout">https://covidtracking.com/edit/logout</Link>.
      </p>
    </Layout>
  )
}

import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '~components/layout'

export default () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.cookie = 'inEdit=false'
    }
  }, [])

  return (
    <Layout title="Edit" path="/edit">
      <h2>Editing disabled</h2>
      <p>
        You can always turn editing on by visiting{' '}
        <Link to="/edit">https://covidtracking.com/edit</Link>.
      </p>
    </Layout>
  )
}

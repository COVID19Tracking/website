import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import Layout from '~components/layout'
import TableResponsive from '~components/common/table-responsive'
import Paragraph from '~components/common/landing-page/paragraph'
import { Form, Input } from '~components/common/form'

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)
const index = client.initIndex('ltc_test_ltcFacilities')

const LongTermCareSearchPage = () => {
  const [query, setQuery] = useState(false)
  const [results, setResults] = useState(false)
  return (
    <Layout title="Long Term Care Facilities">
      <Paragraph>Search long term care facilities</Paragraph>
      <Form>
        <Input
          type="text"
          label="Search"
          onChange={event => {
            setQuery(event.target.value)
          }}
        />
        <button
          type="submit"
          onClick={event => {
            event.preventDefault()
            index.search(query).then(searchResults => {
              setResults(searchResults)
            })
          }}
        >
          Search
        </button>
      </Form>
      {results && (
        <TableResponsive
          labels={[
            {
              field: 'state',
              label: 'State',
            },
            {
              field: 'county',
              label: 'County',
            },
            {
              field: 'city',
              label: 'City',
            },
            {
              field: 'name',
              label: 'Name',
            },
            { field: 'resident_positive', label: 'Resident positives' },
            { field: 'resident_deaths', label: 'Resident death' },
          ]}
          data={results.hits}
        />
      )}
    </Layout>
  )
}

export default LongTermCareSearchPage

import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'
import listStyle from './list.module.scss'

const SearchForm = ({ setQuery }) => {
  const [search, setSearch] = useState(false)
  return (
    <Form
      onSubmit={event => {
        const query = search.trim().toLowerCase()
        event.preventDefault()
        setQuery(query.length ? query : false)
      }}
      noMargin
    >
      <Row>
        <Col width={[3, 3, 8]}>
          <Input
            type="text"
            label="Search by name or city"
            placeholder="Search by name or city"
            hideLabel
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
        </Col>
        <Col width={[1, 3, 4]}>
          <button className={listStyle.searchButton} type="submit">
            Search
          </button>
        </Col>
      </Row>
    </Form>
  )
}

const HHSFacilitiesList = ({ state = false }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(false)
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )
  const index = client.initIndex('test_hhs_facilities')

  const search = async query => {
    const options = {
      distinct: true,
      hitsPerPage: 100,
      filters: state ? `state:"${state}"` : undefined,
      attributesToRetrieve: [
        'hospital_name',
        'city',
        'hospital_subtype',
        'address',
        'hospital_pk',
        'state',
        'inpatient_beds_used_7_day_avg',
        'icu_beds_used_7_day_avg',
      ],
    }
    const hits = await index.search(query, options)
    setResults(hits)
    setIsLoading(false)
  }

  return (
    <>
      <SearchForm
        setQuery={query => {
          setIsLoading(true)
          search(query)
        }}
      />
      {isLoading && <p>LOADING</p>}
      {results && (
        <Table>
          <thead>
            <tr>
              {!state && <Th header>State</Th>}
              <Th header alignLeft>
                Name
              </Th>
              <Th header alignLeft>
                Address
              </Th>
              <Th header isFirst>
                COVID patients
              </Th>
              <Th header>COVID ICU patients</Th>
            </tr>
          </thead>
          <tbody>
            {results.hits.map(hit => (
              <tr>
                {!state && <Td>{hit.state}</Td>}
                <Td alignLeft>{hit.hospital_name}</Td>
                <Td alignLeft>
                  <address>
                    {hit.address}
                    <br />
                    {hit.city}
                  </address>
                </Td>
                <Td isFirst>{hit.inpatient_beds_used_7_day_avg}</Td>
                <Td>{hit.icu_beds_used_7_day_avg}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default HHSFacilitiesList

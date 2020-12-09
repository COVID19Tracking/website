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

const HHSFacilitiesList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(false)
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )
  const index = client.initIndex('test_hhs_facilities')

  const search = async query => {
    const hits = await index.search(query, {
      distinct: true,
      hitsPerPage: 100,
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
    })
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
              <Th header>State</Th>
              <Th header>Name</Th>
              <Th header>Address</Th>
              <Th header>COVID patients</Th>
              <Th header>COVID ICU patients</Th>
            </tr>
          </thead>
          <tbody>
            {results.hits.map(hit => (
              <tr>
                <Td>{hit.state}</Td>
                <Td>{hit.hospital_name}</Td>
                <Td>
                  <address>
                    {hit.address}, {hit.city}
                  </address>
                </Td>
                <Td>{hit.inpatient_beds_used_7_day_avg}</Td>
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

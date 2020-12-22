/* eslint-disable max-len */
import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'
import Modal from '~components/common/modal'
import FacilityDetails, { fields } from './facility-details'
import searchStyle from './search.module.scss'

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
          <button className={searchStyle.searchButton} type="submit">
            Search
          </button>
        </Col>
      </Row>
    </Form>
  )
}

const HHSFacilitiesSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(false)
  const [openedFacility, setOpenedFacility] = useState(false)

  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )
  const index = client.initIndex('live_hhs_hospitals')

  const searchOptions = {
    distinct: true,
    hitsPerPage: 100,
    attributesToRetrieve: [
      'hospital_name',
      'city',
      'hospital_subtype',
      'address',
      'hospital_pk',
      'state',
      ...fields.map(field => field.field),
    ],
  }

  return (
    <>
      <SearchForm
        setQuery={query => {
          setIsLoading(true)
          index.search(query, searchOptions).then(hits => {
            setIsLoading(false)
            setResults(hits)
          })
        }}
      />
      <div role="region" aria-live="polite">
        {isLoading && <p>LOADING</p>}
        {results && (
          <>
            <Table>
              <thead>
                <tr>
                  <Th header>State</Th>
                  <Th header alignLeft>
                    Name
                  </Th>
                  <Th header alignLeft>
                    Address
                  </Th>
                  <Th header isFirst>
                    Adult COVID-19 patients currently in hospital
                  </Th>
                  <Th header>
                    Percent of inpatient beds occupied by COVID-19 patients
                  </Th>
                </tr>
              </thead>
              <tbody>
                {results.hits.map(hit => (
                  <tr>
                    <Td>{hit.state}</Td>
                    <Td alignLeft>
                      <button
                        className={searchStyle.modalButton}
                        type="button"
                        onClick={event => {
                          event.preventDefault()
                          setOpenedFacility(hit)
                        }}
                      >
                        {hit.hospital_name}
                      </button>
                    </Td>
                    <Td alignLeft>
                      <address>
                        {hit.address}
                        <br />
                        {hit.city}
                      </address>
                    </Td>
                    <Td isFirst>
                      {typeof hit.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg !==
                      'undefined' ? (
                        <>
                          {hit.adult_inpatient_beds_occupancy_covid > 0 ? (
                            <>
                              {Math.round(
                                hit.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg,
                              )}
                            </>
                          ) : (
                            'between 0 and 4%'
                          )}
                        </>
                      ) : (
                        <>N/A</>
                      )}
                    </Td>
                    <Td>
                      {typeof hit.adult_inpatient_beds_occupancy_covid !==
                      'undefined' ? (
                        <>
                          {hit.adult_inpatient_beds_occupancy_covid > 0
                            ? `${Math.round(
                                hit.adult_inpatient_beds_occupancy_covid * 100,
                              )}%`
                            : 'between 0 and 4%'}
                        </>
                      ) : (
                        <>N/A</>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>

      {openedFacility && (
        <Modal
          isOpen={openedFacility}
          label={openedFacility.hospital_name}
          onClose={() => {
            setOpenedFacility(false)
          }}
        >
          <FacilityDetails facility={openedFacility} hideSharing />
        </Modal>
      )}
    </>
  )
}

export default HHSFacilitiesSearch

/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch'
import { Table, Th, Td } from '~components/common/table'
import Modal from '~components/common/modal'
import FacilityDetails, { fields } from './facility-details'
import searchStyle from './search.module.scss'

const HHSFacilitiesAnomalies = () => {
  const [isLoading, setIsLoading] = useState(true)
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
    filters: 'anomaly_flag_inpt:1 OR anomaly_flag_icu:1',
    attributesToRetrieve: [
      'hospital_name',
      'city',
      'hospital_subtype',
      'address',
      'hospital_pk',
      'state',
      'anomaly_flag_inpt',
      'anomaly_flag_icu',
      ...fields.map(field => field.field),
    ],
  }

  useEffect(() => {
    index.search('', searchOptions).then(resultHits => {
      setIsLoading(false)
      setResults(
        resultHits.hits.map(facility => ({
          ...facility,
          anomaly_flag_inpt: facility.anomaly_flag_inpt === '1',
          anomaly_flag_icu: facility.anomaly_flag_icu === '1',
        })),
      )
    })
  }, [])

  return (
    <div className={searchStyle.wrapper}>
      <div role="region" aria-live="polite">
        {isLoading && <p>LOADING</p>}
        {results && (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>State</Th>
                  <Th alignLeft>Name</Th>
                  <Th alignLeft>Address</Th>
                  <Th isFirst>Anomalies</Th>
                </tr>
              </thead>
              <tbody>
                {results.map(hit => (
                  <tr key={hit.hospital_pk}>
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
                      {hit.anomaly_flag_inpt === '1' && <>Inpatient</>}{' '}
                      {hit.anomaly_flag_icu === '1' &&
                        hit.anomaly_flag_inpt === '1' && <> and </>}
                      {hit.anomaly_flag_icu === '1' && <>ICU</>} anomalies
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
    </div>
  )
}

export default HHSFacilitiesAnomalies

/* eslint-disable */
import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import { Link } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import Alert from '~components/common/alert'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'
import Modal from '~components/common/modal'
import { FormatDate } from '~components/utils/format'
import LTCMap from '~components/pages/data/long-term-care/map'
import facilitiesStyles from './facilities.module.scss'
import SocialSharing from '~components/common/social-sharing'
import stateCenters from '~data/visualization/state-centers.json'

const getNumber = number => {
  if (!number) {
    return 0
  }
  if (number.search('<') > -1) {
    return 0
  }
  return parseInt(number, 10)
}

const FacilityDetailRow = ({ type, cases, deaths }) => (
  <tr>
    <Th scope="row" alignLeft>
      {type}
    </Th>
    <Td isFirst>{cases}</Td>
    <Td>{deaths}</Td>
  </tr>
)

const FacilityDetails = ({ stateSlug, facility, facilityId }) => (
  <div className={facilitiesStyles.details}>
    <h3>
      {facility.facility_name}
      <span className={facilitiesStyles.share}>
        <SocialSharing
          shares={['link']}
          url={`https://covidtracking.com/data/state/${stateSlug}/long-term-care#${facilityId}`}
        />
      </span>
      <span className={facilitiesStyles.category}>
        <span className="a11y-only">A </span>
        {facility.ctp_facility_category}
      </span>
    </h3>
    <p>
      <strong>Data last updated:</strong>{' '}
      <FormatDate date={facility.date} format="LLLL d yyyy" />
    </p>
    <p>
      {facility.county && (
        <>
          <strong>County:</strong> {facility.county}
        </>
      )}{' '}
      {facility.city && (
        <>
          <strong>City:</strong> {facility.city}
        </>
      )}
    </p>
    {facility.outbreak_status && (
      <p>
        <strong>Outbreak status:</strong> {facility.outbreak_status}
      </p>
    )}
    <h4>Staff</h4>
    <Table>
      <thead>
        <tr>
          <Th header alignLeft>
            Individual
          </Th>
          <Th isFirst>Cases</Th>
          <Th>Deaths</Th>
        </tr>
      </thead>
      <tbody>
        <FacilityDetailRow
          type="Residents"
          cases={facility.resident_positives}
          deaths={facility.resident_deaths}
        />
        <FacilityDetailRow
          type="Staff"
          cases={facility.staff_positive}
          deaths={facility.staff_deaths}
        />
        <FacilityDetailRow
          type="Residents &amp; staff"
          cases={facility.resident_staff_positives}
          deaths={facility.resident_staff_deaths}
        />
      </tbody>
    </Table>
  </div>
)

const LongTermCareFacilities = ({ stateSlug, stateAbbr }) => {
  const [openedFacility, setOpenedFacility] = useState(false)
  const [openedFacilityId, setOpenedFacilityId] = useState(false)
  const [facilityList, setFacilityList] = useState([])
  const [hasCity, setHasCity] = useState(false)
  const [hasCounty, setHasCounty] = useState(false)
  const [hasResidentData, setHasResidentData] = useState(false)

  useEffect(() => {
    setHasCity(
      facilityList.filter(({ properties }) => properties.city).length > 0,
    )

    setHasCounty(
      facilityList.filter(({ properties }) => properties.county).length > 0,
    )

    setHasResidentData(
      facilityList.filter(
        item =>
          item.properties.outbreak_resident_positives ||
          item.properties.outbreak_resident_deaths ||
          item.properties.resident_positives ||
          item.properties.resident_deaths,
      ).length > 0,
    )
  }, [facilityList])

  const stateCenter = stateCenters.find(center => center.state === stateAbbr)
  return (
    <>
      <LTCMap
        center={stateCenter ? [stateCenter.lon, stateCenter.lat] : [-97, 38]}
        zoom={stateCenter ? stateCenter.zoom : 3.5}
        removeSidebar
        state={stateAbbr}
        listFacilities={mappedFacilities =>
          setFacilityList(
            mappedFacilities.sort((a, b) =>
              a.properties.facility_name > b.properties.facility_name ? -1 : 1,
            ),
          )
        }
        button={
          <Link
            className={facilitiesStyles.mapButton}
            to={`/nursing-homes-long-term-care-facilities/map${stateCenter &&
              `#${stateCenter.lon},${stateCenter.lat},${stateCenter.zoom}`}`}
          >
            View more details
          </Link>
        }
      />
      <Disclosure>
        <DisclosureButton className={facilitiesStyles.disclosureButton}>
          View data as a table {}
        </DisclosureButton>
        <DisclosurePanel>
          <p>
            Do you have information about a facility on this list?{' '}
            <Link to="/nursing-homes/contact">
              We would love to hear from you
            </Link>
            .
          </p>
          {openedFacility && (
            <Modal
              isOpen={openedFacility}
              label={`Facility details for ${openedFacility.facility_name}`}
              onClose={() => {
                setOpenedFacility(false)
              }}
            >
              <FacilityDetails
                facility={openedFacility}
                stateSlug={stateSlug}
                facilityId={openedFacilityId}
              />
            </Modal>
          )}
          <div role="region" aria-live="polite">
            {facilityList.length > 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      {hasCounty && (
                        <Th header alignLeft>
                          County
                        </Th>
                      )}
                      {hasCity && (
                        <Th header alignLeft>
                          City
                        </Th>
                      )}
                      <Th header alignLeft>
                        Name
                      </Th>
                      <Th header alignLeft>
                        Category
                      </Th>
                      {hasResidentData ? (
                        <>
                          <Th header isFirst>
                            Resident positives
                          </Th>
                          <Th header>Resident deaths</Th>

                          <Th header isFirst>
                            Outbreak Resident positives
                          </Th>
                          <Th header>Outbreak Resident deaths</Th>
                        </>
                      ) : (
                        <>
                          <Th header isFirst>
                            Resident &amp; staff positives
                          </Th>
                          <Th header>Resident &amp; staff deaths</Th>

                          <Th header isFirst>
                            Outbreak Resident &amp; staff positives
                          </Th>
                          <Th header>Outbreak Resident &amp; staff deaths</Th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {facilityList.map(({ properties }) => {
                      const facility = properties
                      const facilityId = slugify(
                        [
                          facility.county,
                          facility.city,
                          facility.facility_name,
                        ].join('-'),
                        { lower: true },
                      )
                      return (
                        <tr key={facilityId} id={facilityId}>
                          {hasCounty && <Td alignLeft>{facility.county}</Td>}
                          {hasCity && <Td alignLeft>{facility.city}</Td>}
                          <Td alignLeft>
                            <button
                              className={facilitiesStyles.linkButton}
                              type="button"
                              onClick={event => {
                                event.preventDefault()
                                setOpenedFacilityId(facilityId)
                                setOpenedFacility(facility)
                                window.location.hash = facilityId
                              }}
                            >
                              {facility.facility_name}
                            </button>
                          </Td>
                          <Td alignLeft>{facility.ctp_facility_category}</Td>
                          {hasResidentData ? (
                            <>
                              <Td isFirst>{facility.resident_positives}</Td>
                              <Td>{facility.resident_deaths}</Td>
                              <Td isFirst>
                                {facility.outbreak_resident_positives}
                              </Td>
                              <Td>{facility.outbreak_resident_deaths}</Td>
                            </>
                          ) : (
                            <>
                              <Td isFirst>
                                {facility.resident_staff_positives}
                              </Td>
                              <Td>{facility.resident_staff_deaths}</Td>
                              <Td isFirst>
                                {facility.outbreak_resident_staff_positives}
                              </Td>
                              <Td>{facility.outbreak_resident_staff_deaths}</Td>
                            </>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <p>Case totals include confirmed and probable cases.</p>
              </>
            ) : (
              <>
                {facilityList.length > 0 ? (
                  <Alert>No facilities found. Please refine your search.</Alert>
                ) : (
                  <Alert>Facility information not reported</Alert>
                )}
              </>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  )
}

export default LongTermCareFacilities

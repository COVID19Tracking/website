/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import { Link } from 'gatsby'
import Alert from '~components/common/alert'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'
import Modal from '~components/common/modal'
import { FormatDate } from '~components/utils/format'
import facilitiesStyles from './facilities.module.scss'
import SocialSharing from '~components/common/social-sharing'

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

const SearchForm = ({ hasFacilities, setSearchQuery }) => {
  const [search, setSearch] = useState(false)
  return (
    <Form
      onSubmit={event => {
        const query = search.trim().toLowerCase()
        event.preventDefault()
        setSearchQuery(query.length ? query : false)
      }}
      noMargin
    >
      <Row>
        <Col width={[3, 3, 8]}>
          <Input
            type="text"
            label="Search facilities"
            placeholder={
              hasFacilities
                ? 'Search by city, county, or facility name'
                : 'Facility information not reported'
            }
            diabled={!hasFacilities}
            hideLabel
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
        </Col>
        <Col width={[1, 3, 4]}>
          <button className={facilitiesStyles.searchButton} type="submit">
            Search
          </button>
        </Col>
      </Row>
    </Form>
  )
}

const probableFields = {
  resident_positives: 'resident_probable',
  resident_deaths: 'resident_probable_deaths',
  outbreak_resident: 'outbreak_resident_probable',
  outbreak_resident_deaths: 'outbreak_resident_probable_deaths',
  resident_staff_deaths: 'resident_staff_probable_deaths',
}

const LongTermCareFacilities = ({ stateSlug, facilities }) => {
  const [sort, setSort] = useState({ field: 'facility_name', desc: false })
  const [searchQuery, setSearchQuery] = useState(false)
  const [openedFacility, setOpenedFacility] = useState(false)
  const [openedFacilityId, setOpenedFacilityId] = useState(false)
  const [facilityList, setFacilityList] = useState(
    facilities
      .map(group => group.nodes[0])
      .map(facility => {
        Object.keys(probableFields).forEach(field => {
          if (
            facility[probableFields[field]] &&
            !Number.isNaN(facility[field]) &&
            !Number.isNaN(facility[probableFields[field]])
          ) {
            facility[field] =
              parseInt(facility[field], 10) +
              parseInt(facility[probableFields[field]], 10)
          }
        })
        return facility
      })
      .sort((a, b) => (a.facility_name > b.facility_name ? -1 : 1)),
  )

  const hasCity =
    facilities.map(group => group.nodes[0]).filter(({ city }) => city).length >
    0
  const hasCounty =
    facilities.map(group => group.nodes[0]).filter(({ county }) => county)
      .length > 0

  const hasResidentData =
    facilities
      .map(group => group.nodes[0])
      .filter(
        item =>
          item.outbreak_resident_positives ||
          item.outbreak_resident_deaths ||
          item.resident_positives ||
          item.resident_deaths,
      ).length > 0

  useEffect(() => {
    const list = facilities
      .map(group => group.nodes[0])
      .sort((a, b) => {
        if (
          [
            'resident_positives',
            'resident_deaths',
            'outbreak_resident_positives',
            'outbreak_resident_deaths',
          ].indexOf(sort.field) > -1
        ) {
          if (getNumber(a[sort.field]) === getNumber(b[sort.field])) {
            return 0
          }
          if (getNumber(a[sort.field]) < getNumber(b[sort.field])) {
            return sort.desc ? 1 : -1
          }
          return sort.desc ? -1 : 1
        }
        if (a[sort.field] === b[sort.field]) {
          return 0
        }
        if (a[sort.field] < b[sort.field]) {
          return sort.desc ? 1 : -1
        }
        return sort.desc ? -1 : 1
      })
      .filter(facility => {
        if (!searchQuery) {
          return true
        }
        return (
          facility.facility_name.toLowerCase().search(searchQuery) > -1 ||
          (facility.county &&
            facility.county.toLowerCase().search(searchQuery) > -1) ||
          (facility.city &&
            facility.city.toLowerCase().search(searchQuery) > -1)
        )
      })
    setFacilityList(list)
  }, [sort, searchQuery])

  const handleSortClick = field => {
    const desc = sort.field === field ? !sort.desc : true
    setSort({
      field,
      desc,
    })
  }

  const sortDirection = field => {
    if (sort.field === field) {
      return sort.desc ? 'up' : 'down'
    }
    return null
  }
  return (
    <>
      <SearchForm
        hasFacilities={facilities.length > 0}
        setSearchQuery={query => setSearchQuery(query)}
      />
      <p>
        Do you have information about a facility on this list?{' '}
        <Link to="/data/long-term-care/contact">
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
                    <Th
                      header
                      alignLeft
                      sortable
                      onClick={() => handleSortClick('county')}
                      sortDirection={sortDirection('county')}
                    >
                      County
                    </Th>
                  )}
                  {hasCity && (
                    <Th
                      header
                      alignLeft
                      sortable
                      onClick={() => handleSortClick('city')}
                      sortDirection={sortDirection('city')}
                    >
                      City
                    </Th>
                  )}
                  <Th
                    header
                    alignLeft
                    sortable
                    onClick={() => handleSortClick('facility_name')}
                    sortDirection={sortDirection('facility_name')}
                  >
                    Name
                  </Th>
                  <Th header alignLeft>
                    Category
                  </Th>
                  {hasResidentData ? (
                    <>
                      <Th
                        header
                        isFirst
                        sortable
                        onClick={() => handleSortClick('resident_positives')}
                        sortDirection={sortDirection('resident_positives')}
                      >
                        Resident positives
                      </Th>
                      <Th
                        header
                        sortable
                        onClick={() => handleSortClick('resident_deaths')}
                        sortDirection={sortDirection('resident_deaths')}
                      >
                        Resident deaths
                      </Th>

                      <Th
                        header
                        isFirst
                        sortable
                        onClick={() =>
                          handleSortClick('outbreak_resident_positives')
                        }
                        sortDirection={sortDirection(
                          'outbreak_resident_positives',
                        )}
                      >
                        Outbreak Resident positives
                      </Th>
                      <Th
                        header
                        sortable
                        onClick={() =>
                          handleSortClick('outbreak_resident_deaths')
                        }
                        sortDirection={sortDirection(
                          'outbreak_resident_deaths',
                        )}
                      >
                        Outbreak Resident deaths
                      </Th>
                    </>
                  ) : (
                    <>
                      <Th
                        header
                        isFirst
                        sortable
                        onClick={() =>
                          handleSortClick('resident_staff_positives')
                        }
                        sortDirection={sortDirection(
                          'resident_staff_positives',
                        )}
                      >
                        Resident &amp; staff positives
                      </Th>
                      <Th
                        header
                        sortable
                        onClick={() => handleSortClick('resident_staff_deaths')}
                        sortDirection={sortDirection('resident_staff_deaths')}
                      >
                        Resident &amp; staff deaths
                      </Th>

                      <Th
                        header
                        isFirst
                        sortable
                        onClick={() =>
                          handleSortClick('outbreak_resident_staff_positives')
                        }
                        sortDirection={sortDirection(
                          'outbreak_resident_staff_positives',
                        )}
                      >
                        Outbreak Resident &amp; staff positives
                      </Th>
                      <Th
                        header
                        sortable
                        onClick={() =>
                          handleSortClick('outbreak_resident_staff_deaths')
                        }
                        sortDirection={sortDirection(
                          'outbreak_resident_staff_deaths',
                        )}
                      >
                        Outbreak Resident &amp; staff deaths
                      </Th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {facilityList.map(facility => {
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
                          <Td isFirst>{facility.resident_staff_positives}</Td>
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
            {facilities.length > 0 ? (
              <Alert>No facilities found. Please refine your search.</Alert>
            ) : (
              <Alert>Facility information not reported</Alert>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default LongTermCareFacilities

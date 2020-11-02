import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import Alert from '~components/common/alert'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'
import Modal from '~components/common/modal'
import { FormatDate } from '~components/utils/format'
import facilitiesStyles from './facilities.module.scss'

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

const FacilityDetails = ({ facility }) => (
  <div className={facilitiesStyles.details}>
    <h3>
      {facility.facility_name}
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

const SearchForm = ({ setSearchQuery }) => {
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
            placeholder="Search by city, county, or facility name"
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

const LongTermCareFacilities = ({ facilities }) => {
  const [sort, setSort] = useState({ field: 'facility_name', desc: false })
  const [searchQuery, setSearchQuery] = useState(false)
  const [openedFacility, setOpenedFacility] = useState(false)
  const [facilityList, setFacilityList] = useState(
    facilities
      .map(group => group.nodes[0])
      .sort((a, b) => (a.facility_name > b.facility_name ? -1 : 1)),
  )

  const hasCity =
    facilities.map(group => group.nodes[0]).filter(({ city }) => city).length >
    0
  const hasCounty =
    facilities.map(group => group.nodes[0]).filter(({ county }) => county)
      .length > 0

  useEffect(() => {
    const list = facilities
      .map(group => group.nodes[0])
      .sort((a, b) => {
        if (
          ['resident_positives', 'resident_deaths'].indexOf(sort.field) > -1
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
      <SearchForm setSearchQuery={query => setSearchQuery(query)} />
      {openedFacility && (
        <Modal
          isOpen={openedFacility}
          label={`Facility details for ${openedFacility.facility_name}`}
          onClose={() => {
            setOpenedFacility(false)
          }}
        >
          <FacilityDetails facility={openedFacility} />
        </Modal>
      )}
      <div role="region" aria-live="polite">
        {facilityList.length > 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {facilityList.map(facility => {
                const facilityId = slugify(
                  [facility.county, facility.city, facility.facility_name].join(
                    '-',
                  ),
                  { lower: true },
                )
                return (
                  <tr key={facility.id} id={facilityId}>
                    {hasCounty && <Td alignLeft>{facility.county}</Td>}
                    {hasCity && <Td alignLeft>{facility.city}</Td>}
                    <Td alignLeft>
                      <button
                        className={facilitiesStyles.linkButton}
                        type="button"
                        onClick={event => {
                          event.preventDefault()
                          setOpenedFacility(facility)
                          window.location.hash = facilityId
                        }}
                      >
                        {facility.facility_name}
                      </button>
                    </Td>
                    <Td alignLeft>{facility.ctp_facility_category}</Td>
                    <Td isFirst>{facility.resident_positives}</Td>
                    <Td>{facility.resident_deaths}</Td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        ) : (
          <Alert>No facilities found. Please refine your search.</Alert>
        )}
      </div>
    </>
  )
}

export default LongTermCareFacilities

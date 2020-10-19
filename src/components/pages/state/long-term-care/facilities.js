import React, { useState } from 'react'
import { Table, Th, Td } from '~components/common/table'
import { Form, Input } from '~components/common/form'

const SearchForm = ({ setSearchQuery }) => {
  const [search, setSearch] = useState(false)
  return (
    <Form>
      <Input
        type="text"
        label="Search facilities"
        placeholder="Search by city, county, or facility name"
        hideLabel
        onChange={event => {
          setSearch(event.target.value)
        }}
      />
      <button
        type="submit"
        onClick={event => {
          const query = search.trim().toLowerCase()
          event.preventDefault()
          setSearchQuery(query.length ? query : false)
        }}
      >
        Search
      </button>
    </Form>
  )
}

const LongTermCareFacilities = ({ facilities }) => {
  const [sort, setSort] = useState({ field: 'name', desc: true })
  const [searchQuery, setSearchQuery] = useState(false)

  const hasCity =
    facilities.map(group => group.nodes[0]).filter(({ city }) => city).length >
    0
  const hasCounty =
    facilities.map(group => group.nodes[0]).filter(({ county }) => county)
      .length > 0
  const facilityList = facilities
    .map(group => group.nodes[0])
    .sort((a, b) => {
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
        (facility.city && facility.city.toLowerCase().search(searchQuery)) > -1
      )
    })

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
          {facilityList.map(facility => (
            <tr>
              {hasCounty && <Td alignLeft>{facility.county}</Td>}
              {hasCity && <Td alignLeft>{facility.city}</Td>}
              <Td alignLeft>{facility.facility_name}</Td>
              <Td alignLeft>{facility.ctp_facility_category}</Td>
              <Td isFirst>{facility.resident_positives}</Td>
              <Td>{facility.resident_deaths}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default LongTermCareFacilities

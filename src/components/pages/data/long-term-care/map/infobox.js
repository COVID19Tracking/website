/* eslint-disable max-len */
import React from 'react'
import Infobox from '~components/common/map/infobox'

const Item = ({ title, value }) => (
  <p>
    <strong>{title}</strong> {value ? <>{value}</> : <>N/A</>}
  </p>
)

const LtcInfobox = ({ layer, facility, x, y }) => {
  const hasResidentData =
    facility.outbreak_resident_positives ||
    facility.outbreak_resident_deaths ||
    facility.resident_positives ||
    facility.resident_deaths
  return (
    <Infobox x={x} y={y}>
      {layer === 'cms-cases' ? (
        <>
          <h3>{facility.name}</h3>
          <Item
            title="Resident cases"
            value={
              facility['residents-total-suspected-covid-19'] +
              facility['residents-total-confirmed-covid-19']
            }
          />
          <Item
            title="Resident deaths"
            value={facility['residents-total-all-deaths']}
          />
          <Item
            title="Staff cases"
            value={
              facility['staff-total-suspected-covid-19'] +
              facility['staff-total-confirmed-covid-19']
            }
          />
          <Item
            title="Staff deaths"
            value={facility['staff-total-all-deaths']}
          />
        </>
      ) : (
        <>
          <h3>{facility.facility_name}</h3>
          {hasResidentData ? (
            <>
              <Item
                title="Resident cases"
                value={facility.resident_positives}
              />
              <Item title="Resident deaths" value={facility.resident_deaths} />
              <Item
                title="Outbreak resident cases"
                value={facility.outbreak_resident_positives}
              />
              <Item
                title="Outbreak resident cases"
                value={facility.outbreak_resident_deaths}
              />
            </>
          ) : (
            <>
              <Item
                title="Resident &amp; staff cases"
                value={facility.resident_staff_positives}
              />
              <Item
                title="Resident &amp; staff deaths"
                value={facility.resident_staff_deaths}
              />
              <Item
                title="Outbreak resident &amp; staff cases"
                value={facility.outbreak_resident_staff_positives}
              />
              <Item
                title="Outbreak resident &amp; staff deaths"
                value={facility.outbreak_resident_staff_deaths}
              />
            </>
          )}
        </>
      )}
      <p>Click to view more information</p>
    </Infobox>
  )
}

export default LtcInfobox

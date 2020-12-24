/* eslint-disable max-len */
import React from 'react'
import infoboxStyle from './infobox.module.scss'

const Item = ({ title, value }) => (
  <p>
    <strong>{title}</strong> {value ? <>{value}</> : <>N/A</>}
  </p>
)

const Infobox = ({ facility, x, y }) => {
  const hasResidentData =
    facility.outbreak_resident_positives ||
    facility.outbreak_resident_deaths ||
    facility.resident_positives ||
    facility.resident_deaths
  return (
    <div
      className={infoboxStyle.infobox}
      style={{
        left: Math.max(10, x - 175),
        top: y + 15,
      }}
    >
      <h3>{facility.facility_name}</h3>
      {hasResidentData ? (
        <>
          <Item
            title="Resident positives"
            value={facility.resident_positives}
          />
          <Item title="Resident deaths" value={facility.resident_deaths} />
          <Item
            title="Outbreak resident positives"
            value={facility.outbreak_resident_positives}
          />
          <Item
            title="OUtbreak resident positives"
            value={facility.outbreak_resident_deaths}
          />
        </>
      ) : (
        <>
          <Item
            title="Resident &amp; staff positives"
            value={facility.resident_staff_positives}
          />
          <Item
            title="Resident &amp; staff deaths"
            value={facility.resident_staff_deaths}
          />
          <Item
            title="Outbreak resident &amp; staff positives"
            value={facility.outbreak_resident_staff_positives}
          />
          <Item
            title="OUtbreak resident&amp; staff positives"
            value={facility.outbreak_resident_staff_deaths}
          />
        </>
      )}
      <p>Click to view more information</p>
    </div>
  )
}

export default Infobox

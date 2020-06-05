import React from 'react'

export default ({ daily }) => (
  <>
    <h2>Raw data</h2>
    <ul>
      {Object.keys(daily).map(key => (
        <li key={key}>
          <strong>{key}:</strong> {daily[key]}
        </li>
      ))}
    </ul>
  </>
)

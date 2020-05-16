import React from 'react'

export default ({ groupedNotes }) => (
  <ol>
    {groupedNotes.map(note => (
      <li>{note}</li>
    ))}
  </ol>
)

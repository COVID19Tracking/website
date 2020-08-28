const CautionNotes = (data, notes) => {
  const cautionNotes = notes
  Object.keys(cautionNotes).forEach(field => {
    if (
      typeof data[`${field}Caution`] !== 'undefined' &&
      data[`${field}Caution`]
    ) {
      cautionNotes[
        field
      ] = `This data should not be compared with percentage of the the population. ${notes[
        field
      ] || ''}`
    }
  })
  return cautionNotes
}

export default CautionNotes

export default (data, stateNotes) => {
  const notes = stateNotes
  if (data.asianPosCaution) {
    // if a state's Asian positives include NH/PI
    notes.asianPos = data.asianANHPIPosNotes
      ? data.asianANHPIPosNotes
      : notes.asianPos
    notes.nhpiPos = data.nhpiANHPIPosNotes
      ? data.nhpiANHPIPosNotes
      : notes.nhpiPos
  }
  if (data.asianDeathCaution) {
    // if a state's Asian deaths include NH/PI
    notes.asianDeath = data.asianANHPIDeathNotes
      ? data.asianANHPIDeathNotes
      : notes.asianDeath
    notes.nhpiDeath = data.nhpiANHPIDeathNotes
      ? data.nhpiANHPIDeathNotes
      : notes.nhpiDeath
  }

  if (data.nhpiPosCaution) {
    notes.nhpiPos = data.nhpiANHPIPosNotes
      ? data.nhpiANHPIPosNotes
      : notes.nhpiPos
  }
  if (data.nhpiIDeathCaution) {
    notes.nhpiDeath = data.nhpiANHPIDeathNotes
      ? data.nhpiANHPIDeathNotes
      : notes.nhpiDeath
  }
}

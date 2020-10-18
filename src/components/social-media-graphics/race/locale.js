import React from 'react'

const SocialCardLocale = ({ name }) => {
  if (name === 'United States') {
    return (
      <>
        In the <strong>United States</strong>
      </>
    )
  }

  if (name === 'District of Columbia') {
    return (
      <>
        In the <strong>District of Columbia</strong>
      </>
    )
  }

  return (
    <>
      In <strong>{name}</strong>
    </>
  )
}

export default SocialCardLocale

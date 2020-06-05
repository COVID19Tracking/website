import React, { useEffect, useState } from 'react'

export default ({ state, date }) => {
  const [apiResult, setApiResult] = useState(false)

  useEffect(() => {
    fetch(`/api/v1/states/${state.toLowerCase()}/${date}.json`)
      .then(response => response.json())
      .then(result => {
        setApiResult(JSON.stringify(result, null, 2))
      })
  }, [state, date])

  return (
    <section>
      <h2>API</h2>
      <code>
        <pre>{apiResult || 'Loading...'}</pre>
      </code>
    </section>
  )
}

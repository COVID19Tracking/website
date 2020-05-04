import React from 'react'
import { Location } from '@reach/router'
import queryString from 'query-string'

const withLocation = Comp => props => (
  <Location>
    {({ location, navigate }) => (
      <Comp
        {...props}
        location={location}
        navigate={navigate}
        search={location.search ? queryString.parse(location.search) : {}}
      />
    )}
  </Location>
)

export default withLocation

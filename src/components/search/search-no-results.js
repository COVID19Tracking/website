import React from 'react'
import { Link } from 'gatsby'

const SearchNoResult = ({ query = false }) =>
  query && (
    <div>
      <h2>
        No results for &quot;
        {query}&quot;
      </h2>
      <p>
        We couldn’t find anything matching your search. Please try a different
        search.
      </p>
      <p>
        You can also check out these helpful places to find what you’re looking
        for:
      </p>
      <ul>
        <li>
          <Link to="/data">State-by-state Data</Link> - A list of COVID data by
          state
        </li>
        <li>
          <Link to="/data/us-daily">US Daily totals</Link> - A list of US COVID
          totals by day
        </li>
        <li>
          <Link to="/about-data">About our data</Link> - More about our data and
          methodology
        </li>
        <li>
          <Link to="/api">Data API</Link> - Our data API for developers
        </li>
      </ul>
    </div>
  )

export default SearchNoResult

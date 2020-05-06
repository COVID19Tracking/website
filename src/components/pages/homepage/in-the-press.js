import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PressList from '~components/common/press-list'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidPress(
        filter: {
          addToCovidTrackingProjectWebsite: { eq: true }
          title: { ne: "null" }
        }
        sort: { fields: publishDate, order: DESC }
        limit: 4
      ) {
        edges {
          node {
            id
            title
            url
            publication
            publishDate(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  `)

  return <PressList items={data.allCovidPress.edges} />
}

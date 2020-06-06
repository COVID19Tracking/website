import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PressList from '~components/common/press-list'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulRaceProjectNewsArticle(sort: { fields: date, order: DESC }) {
        nodes {
          id
          publication: publicationName
          title
          publishDate: date(formatString: "MMMM D, YYYY")
          url: link
        }
      }
    }
  `)

  return <PressList items={data.allContentfulRaceProjectNewsArticle.nodes} />
}

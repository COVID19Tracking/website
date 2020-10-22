/* eslint-disable */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Tweet from '~components/common/tweet'

const DailyTweet = () => {
  const data = useStaticQuery(graphql`
    {
      allCovidTweet(
        filter: { full_text: { regex: "/Our daily update is published/" } }
        sort: { fields: id_str, order: DESC }
        limit: 1
      ) {
        nodes {
          created_at
          id_str
          entities {
            urls {
              display_url
            }
            media {
              media_url
            }
          }
          full_text
        }
      }
    }
  `)

  const {
    id_str,
    full_text,
    entities,
    created_at,
  } = data.allCovidTweet.nodes[0]

  return (
    <Tweet
      text={full_text}
      media={entities.media[0] && entities.media[0].media_url}
      link={`https://twitter.com/COVID19Tracking/status/${id_str}`}
      date={created_at}
    />
  )
}

export default DailyTweet

/* eslint-disable camelcase */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const DailyTweet = () => {
  const data = useStaticQuery(graphql`
    {
      allTweets(
        filter: { is_pinned: { eq: true } }
        sort: { fields: date, order: DESC }
        limit: 1
      ) {
        nodes {
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
  const { allTweets } = data
  if (!allTweets || !allTweets.nodes[0]) {
    return null
  }
  const { entities, full_text, id_str } = allTweets.nodes[0]
  if (!entities.media) {
    return null
  }

  return (
    <a href={`https://twitter.com/COVID19Tracking/status/${id_str}`}>
      <img
        src={entities.media[0].media_url.replace(/http(s?):\/\//g, '//')}
        alt={full_text}
      />
    </a>
  )
}
export default DailyTweet

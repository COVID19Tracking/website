/* eslint-disable camelcase */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Container from '~components/common/container'

const ChartTweet = () => {
  const data = useStaticQuery(graphql`
    {
      allTweets(
        filter: { is_pinned: { eq: true } }
        sort: { fields: date, order: DESC }
        limit: 1
      ) {
        nodes {
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
  const { entities, full_text } = allTweets.nodes[0]
  if (!entities.media) {
    return null
  }

  return (
    <Container centered>
      <h2> The national picture over time</h2>
      <img
        src={entities.media[0].media_url.replace(/http(s?):\/\//g, '//')}
        alt={full_text}
      />
    </Container>
  )
}
export default ChartTweet

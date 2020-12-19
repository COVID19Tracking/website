/* eslint-disable */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Tweet from '~components/common/tweet'

const DailyTweet = () => {
  const data = useStaticQuery(graphql`
    {
      allTweets(filter: { is_pinned: { eq: true } }, limit: 1) {
        nodes {
          id_str
          created_at
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

  if (!data || !data.allTweets) {
    return null
  }

  const { id_str, full_text, entities, created_at } = data.allTweets.nodes[0]
  return (
    <Tweet
      text={full_text}
      media={entities.media[0] && entities.media[0].media_url}
      link={`https://twitter.com/COVID19Tracking/status/${id_str}`}
      date={DateTime.fromFormat(created_at, 'EEE MMM dd HH:mm:ss ZZZ yyyy', {
        setZone: true,
      })
        .setZone('America/New_York')
        .toFormat('LLLL d yyyy')}
    />
  )
}

export default DailyTweet

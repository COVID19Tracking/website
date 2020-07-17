/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import timelineStyles from './timeline.module.scss'

const prepareObject = nodes => {
  const events = []
  nodes.forEach(node => {
    const startDate = DateTime.fromISO(node.date)
    const endDate = DateTime.fromISO(node.date)
    const media = {
      caption: node.mediaCaption,
      credit: node.mediaCredit,
    }
    if (node.image) {
      media.url = node.image.file.url
    } else {
      media.url = node.media ? node.media.media : false
    }
    events.push({
      start_date: startDate.toObject(),
      end_date: endDate.toObject(),
      group: node.timeline,
      text: {
        headline: node.title,
        text: node.description.childMarkdownRemark.html,
      },
      media: media.url ? media : false,
    })
  })

  return { events }
}

export default ({ timeline }) => {
  const timelineRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const scriptElement = document.createElement('script')
    scriptElement.src =
      'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js'
    scriptElement.onload = () => {
      const currentTimeline = new window.TL.Timeline(
        timelineRef.current,
        prepareObject(timeline),
      )
    }
    document.getElementsByTagName('head')[0].appendChild(scriptElement)
  }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"
      />
      <div className={timelineStyles.timeline}>
        <div id="timeline" ref={timelineRef} />
      </div>
    </>
  )
}

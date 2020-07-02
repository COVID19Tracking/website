import React from 'react'
import { FormatDate } from '~components/utils/format'
import timelineStyle from './timeline.module.scss'

const TimelineItem = ({ item }) => (
  <div>
    <h3>{item.title}</h3>
    <FormatDate date={item.date} format="LLL d yyyy" />
    {item.dateEnd && (
      <>
        {' to '}
        <FormatDate date={item.dateEnd} format="LLL d yyyy" />
      </>
    )}
    <div
      dangerouslySetInnerHTML={{
        __html:
          item.childContentfulEventDescriptionTextNode.childMarkdownRemark.html,
      }}
    />
  </div>
)

export default ({ events }) => (
  <div className={timelineStyle.timeline}>
    <div className={timelineStyle.barContainer}>
      <div className={timelineStyle.bar} />
    </div>
    <div className={timelineStyle.events}>
      {events.map(item => (
        <TimelineItem item={item} />
      ))}
    </div>
  </div>
)

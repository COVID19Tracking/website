import React from 'react'
import '../../scss/components/common/press-list.scss'
import DetailText from './detail-text'

export default ({ items }) => {
  return (
    <ul className="press-list">
      {items.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          <a href={node.url}>{node.title}</a>
          <DetailText>
            {node.publication}
            <span className="dot-separator">•</span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

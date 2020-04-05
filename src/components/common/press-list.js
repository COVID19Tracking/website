import React from 'react'
import '../../scss/components/common/press-list.scss'
import '../../scss/components/common/publication-formatting.scss'
import DetailText from './detail-text'

export default ({ items }) => {
  return (
    <ul className="press-list">
      {items.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          <cite className="publication-title">
            <a href={node.url}>{node.title}</a>
          </cite>
          <DetailText>
            <span className="publication-source">{node.publication}</span>
            <span className="dot-separator">•</span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

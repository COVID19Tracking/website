import React from 'react'
import pressListStyle from './press-list.module.scss'
import { PublicationTitle, PublicationSource } from './publication'
import DetailText from './detail-text'

export default ({ items }) => {
  return (
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {items.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          <PublicationTitle>
            <a href={node.url}>{node.title}</a>
          </PublicationTitle>
          <DetailText>
            <PublicationSource>{node.publication}</PublicationSource>
            <span className={pressListStyle.dotSeparator}>•</span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

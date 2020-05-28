import React from 'react'
import pressListStyle from '~components/common/press-list.module.scss'
import {
  PublicationTitle,
  PublicationSource,
} from '~components/common/publication'
import DetailText from '~components/common/detail-text'

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
            <span className={pressListStyle.dotSeparator} aria-hidden>
              •
            </span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

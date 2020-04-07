import React from 'react'
import pressListStyle from '../../scss/components/common/press-list.module.scss'
import publicationFormattingStyle from '../../scss/components/common/publication-formatting.module.scss'
import DetailText from './detail-text'

export default ({ items }) => {
  return (
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {items.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          <cite className={publicationFormattingStyle.title}>
            <a href={node.url}>{node.title}</a>
          </cite>
          <DetailText>
            <span className={publicationFormattingStyle.source}>
              {node.publication}
            </span>
            <span className={pressListStyle.dotSeparator}>•</span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

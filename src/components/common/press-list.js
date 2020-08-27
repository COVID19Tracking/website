import React from 'react'
import pressListStyle from './press-list.module.scss'
import DetailText from './detail-text'

const PublicationTitle = ({ children }) => (
  <cite className={pressListStyle.title}>{children}</cite>
)

const PublicationSource = ({ children }) => (
  <span className={pressListStyle.source}>{children}</span>
)

export default ({ items }) => {
  return (
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {items.map(node => (
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

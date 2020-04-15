import React from 'react'
import { Link } from 'gatsby'
import pressListStyle from './press-list.module.scss'
import { PublicationTitle } from './publication'
import DetailText from './detail-text'

export default ({ items }) => {
  return (
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {items.map(({ node }) => (
        <li key={`homepage-blog-${node.id}`}>
          <PublicationTitle>
            <Link to={`/blog/${node.slug}`}>{node.title}</Link>
          </PublicationTitle>
          <DetailText>
            {node.author.name}{' '}
            <span className={pressListStyle.dotSeparator}>•</span>
            {node.publishDate}
          </DetailText>
        </li>
      ))}
    </ul>
  )
}

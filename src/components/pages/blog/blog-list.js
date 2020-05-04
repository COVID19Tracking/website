import React from 'react'
import { Link } from 'gatsby'
import pressListStyle from '../../common/press-list.module.scss'
import { PublicationTitle } from '../../common/publication'
import { OneLineByline } from './byline'

export default ({ items }) => {
  return (
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {items.map(({ node }) => (
        <li key={`homepage-blog-${node.slug}`}>
          <PublicationTitle>
            <Link to={`/blog/${node.slug}`}>{node.title}</Link>
          </PublicationTitle>
          <OneLineByline authors={node.authors} date={node.publishDate} />
        </li>
      ))}
    </ul>
  )
}

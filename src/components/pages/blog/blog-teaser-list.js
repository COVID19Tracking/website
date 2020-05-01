import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Byline } from './byline'
import blogTeaserListStyles from './blog-teaser-list.module.scss'

export default ({ items }) => (
  <>
    {items.map(({ node }) => (
      <Fragment key={`blog-${node.slug}`}>
        <h2 className={`hed-primary ${blogTeaserListStyles.postTitle}`}>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h2>
        <Byline authors={node.authors} date={node.publishDate} smallmargin />
        <p className="lede">{node.lede.lede}</p>
      </Fragment>
    ))}
  </>
)

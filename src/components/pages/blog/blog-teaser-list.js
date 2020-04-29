import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import Byline from './byline'

export default ({ items }) => (
  <>
    {items.map(({ node }) => (
      <Fragment key={`blog-${node.slug}`}>
        <h2 className="hed-primary">
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h2>
        <Byline authors={node.authors} date={node.publishDate} />
        <p className="lede">{node.lede.lede}</p>
      </Fragment>
    ))}
  </>
)

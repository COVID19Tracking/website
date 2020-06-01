import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Byline } from './byline'
import CleanSpacing from '~components/utils/clean-spacing'

export default ({ items }) => (
  <>
    {items.map(({ node }) => (
      <Fragment key={`blog-${node.slug}`}>
        <h2 className={`hed-primary `}>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h2>
        <Byline authors={node.authors} date={node.publishDate} smallmargin />
        <p className="lede">
          <CleanSpacing>{node.lede.lede}</CleanSpacing>
        </p>
      </Fragment>
    ))}
  </>
)

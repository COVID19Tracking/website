import React from 'react'
import { Link } from 'gatsby'
import { Byline } from './byline'
import Container from '~components/common/container'
import CleanSpacing from '~components/utils/clean-spacing'
import blogTeaserListStyle from './blog-teaser-list.module.scss'

export default ({ items }) => (
  <Container narrow className={blogTeaserListStyle.container}>
    {items.map(node => (
      <div key={`blog-${node.slug}`} className={blogTeaserListStyle.teaser}>
        <h2 className={blogTeaserListStyle.title}>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </h2>
        <p className="lede">
          <CleanSpacing>{node.lede.lede}</CleanSpacing>
        </p>
        <Byline authors={node.authors} date={node.publishDate} smallmargin />
      </div>
    ))}
  </Container>
)

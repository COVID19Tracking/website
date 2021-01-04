import React from 'react'
import { Link } from 'gatsby'
import { Byline } from './byline'
import Categories from '~components/pages/blog/blog-categories'
import Container from '~components/common/container'
import CleanSpacing from '~components/utils/clean-spacing'
import blogTeaserListStyle from './blog-teaser-list.module.scss'

const BlogTeaserList = ({
  items,
  subPath = '/analysis-updates',
  useCategoryLink = true,
}) => (
  <Container narrow className={blogTeaserListStyle.container}>
    {items.map(node => (
      <div key={`blog-${node.slug}`} className={blogTeaserListStyle.teaser}>
        <Categories
          categories={node.categories}
          lightBackground
          subPath={subPath}
          useLink={useCategoryLink}
        />
        <h2 className={blogTeaserListStyle.title}>
          <Link
            to={
              node.overrideBlogPage
                ? node.overrideBlogPath
                : `${subPath}/${node.slug}`
            }
          >
            {node.title}
          </Link>
        </h2>
        <p className="lede">
          <CleanSpacing>{node.lede.lede}</CleanSpacing>
        </p>
        <Byline
          authors={node.authors}
          published={node.publishDate}
          updated={node.updateDateTime}
          smallmargin
        />
      </div>
    ))}
  </Container>
)

export default BlogTeaserList

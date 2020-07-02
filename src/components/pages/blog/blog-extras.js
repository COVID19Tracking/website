import React from 'react'
import RelatedPosts from '~components/pages/blog/related-posts'
import SectionDivider from '~components/common/section-divider'
import AuthorFooter from '~components/pages/blog/author-footer'
import blogExtrasStyles from './blog-extras.module.scss'

export default ({ blogPost }) => (
  <>
    <hr className={blogExtrasStyles.divider} />
    <div className={blogExtrasStyles.eightColWrapper}>
      <AuthorFooter authors={blogPost.authors} />
    </div>
    <SectionDivider className={blogExtrasStyles.fullWidth} />
    <div className={blogExtrasStyles.eightColWrapper}>
      <RelatedPosts blogPost={blogPost} />
    </div>
  </>
)

import React from 'react'
import RelatedPosts from '~components/pages/blog/related-posts'
import AuthorFooter from '~components/pages/blog/author-footer'
import blogExtrasStyles from './blog-extras.module.scss'

export default ({ blogPost }) => (
  <>
    <hr />
    <div className={blogExtrasStyles.eightColWrapper}>
      <AuthorFooter authors={blogPost.authors} />
    </div>
    <hr className={blogExtrasStyles.fullWidth} />
    <div className={blogExtrasStyles.eightColWrapper}>
      <RelatedPosts blogPost={blogPost} />
    </div>
  </>
)

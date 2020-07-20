import React from 'react'
import RelatedPosts from './related-posts'
import SectionDivider from '~components/common/section-divider'
import AuthorFooter from './author-footer'
import blogExtrasStyles from './blog-extras.module.scss'

export default ({ blogPost }) => {
  const footerAuthors = blogPost.authors.filter(
    author => author.childContentfulAuthorBiographyTextNode !== null,
  ) // only keep authors with biographies

  return (
    <>
      {footerAuthors.length > 0 && (
        <>
          <hr className={blogExtrasStyles.divider} />
          <div className={blogExtrasStyles.eightColWrapper}>
            <AuthorFooter authors={footerAuthors} />
          </div>
        </>
      )}
      <SectionDivider className={blogExtrasStyles.fullWidth} />
      <div className={blogExtrasStyles.eightColWrapper}>
        <RelatedPosts blogPost={blogPost} />
      </div>
    </>
  )
}

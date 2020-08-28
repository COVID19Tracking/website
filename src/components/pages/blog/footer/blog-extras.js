import React from 'react'
import classnames from 'classnames'
import RelatedPosts from './related-posts'
import AuthorFooter from './author-footer'
import blogExtrasStyles from './blog-extras.module.scss'

const BlogExtras = ({ blogPost }) => {
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
      <hr
        className={classnames(
          blogExtrasStyles.divider,
          blogExtrasStyles.fullWidth,
        )}
      />
      <div className={blogExtrasStyles.eightColWrapper}>
        <RelatedPosts blogPost={blogPost} />
      </div>
    </>
  )
}

export default BlogExtras

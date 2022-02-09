import React from 'react'
import classnames from 'classnames'
import RelatedPosts from './related-posts'
import AuthorFooter from './author-footer'
import DownloadLinks from './download-links'
import blogExtrasStyles from './blog-extras.module.scss'

const BlogExtras = ({ blogPost, categories, hideRelated = false }) => {
  const footerAuthors = blogPost.authors.filter(
    author => author.childContentfulAuthorBiographyTextNode !== null,
  ) // only keep authors with biographies

  return (
    <div className={blogExtrasStyles.wrapper}>
      {blogPost.chartData && <DownloadLinks links={blogPost.chartData} />}
      {footerAuthors.length > 0 && (
        <>
          <div className={blogExtrasStyles.eightColWrapper}>
            <AuthorFooter authors={footerAuthors} />
          </div>
        </>
      )}
      {categories && categories.length && (
        <p
          className={classnames(
            blogExtrasStyles.categories,
            blogExtrasStyles.eightColWrapper,
          )}
        >
          <strong>Posted in:</strong>{' '}
          {categories.map(category => (
            <span>{category.name}</span>
          ))}
        </p>
      )}
      {!hideRelated && (
        <div className={blogExtrasStyles.eightColWrapper}>
          <RelatedPosts blogPost={blogPost} />
        </div>
      )}
    </div>
  )
}

export default BlogExtras

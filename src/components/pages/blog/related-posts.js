import React from 'react'
import { Link } from 'gatsby'
import { AuthorsText } from './byline'
import RelatedPostsStyles from './related-posts.module.scss'

export default ({ posts }) => (
  <div className={RelatedPostsStyles.container}>
    <h2>Related</h2>
    {posts.map(post => (
      <div key={post.slug}>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className={RelatedPostsStyles.byline}>
          By:{' '}
          <span className={RelatedPostsStyles.authors}>
            <AuthorsText authors={post.authors} />
          </span>
          <span className="related-date">{post.publishDate}</span>
        </p>
      </div>
    ))}
  </div>
)

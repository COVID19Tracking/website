import React from 'react'
import { Link } from 'gatsby'
import { Byline } from './byline'
import RelatedPostsStyles from './related-posts.module.scss'

/*
1. Use the explicitly declared related posts
2. (if no explicit related posts) Use recent posts from the
   post's first category
3. (if no category) Display recent posts
*/

export default ({ blogPost }) => {
  const { relatedBlogPosts, categories } = blogPost
  let footerPosts
  let relatedTitle
  if (relatedBlogPosts) {
    footerPosts = relatedBlogPosts
    relatedTitle = 'Related posts'
  } else if (categories) {
    footerPosts = categories[0].blog_post.filter(post => post.publishDate)
    relatedTitle = `More posts about “${categories[0].name}”`
  } else {
    relatedTitle = 'Recent posts'
    // todo staticquery for top 3 latest posts
  }
  footerPosts = footerPosts.slice(0, 2) // max 3 blog posts
  return (
    <div className={RelatedPostsStyles.container}>
      {/* todo add cta */}
      <h2>{relatedTitle}</h2>
      {footerPosts.map(post => (
        <div key={post.slug}>
          <h3>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className={RelatedPostsStyles.lede}>{post.lede.lede}</p>
          <Byline authors={post.authors} date={post.publishDate} />
        </div>
      ))}
    </div>
  )
}

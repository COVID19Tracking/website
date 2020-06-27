import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Byline } from './byline'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import RelatedPostsStyles from './related-posts.module.scss'

export default ({ blogPost }) => {
  const { relatedBlogPosts, categories } = blogPost
  let footerPosts
  let relatedTitle
  if (relatedBlogPosts) {
    // 1. Use the explicitly declared related posts
    footerPosts = relatedBlogPosts
    relatedTitle = 'Related posts'
  } else if (categories) {
    // 2. (if no explicit related posts) Use recent posts from the
    //    post's first category
    footerPosts = categories[0].blog_post.filter(post => post.publishDate)
    relatedTitle = `More “${categories[0].name}” posts`
  } else {
    // 3. (if no category) Display recent posts
    const recentPosts = useStaticQuery(graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
          nodes {
            slug
            publishDate(formatString: "MMMM D, YYYY")
            authors {
              name
              twitterLink
              twitterHandle
              link
              childContentfulAuthorBiographyTextNode {
                childMarkdownRemark {
                  html
                }
              }
              headshot {
                file {
                  fileName
                }
                resize(width: 200) {
                  width
                  height
                  src
                }
              }
            }
            title
            lede {
              lede
            }
          }
        }
      }
    `)
    footerPosts = recentPosts.allContentfulBlogPost.nodes
    relatedTitle = 'Latest posts'
  }
  footerPosts = footerPosts.filter(post => post.slug !== blogPost.slug) // rm this post from related posts
  footerPosts = footerPosts.slice(0, 3) // max 3 blog posts
  return (
    <div className={RelatedPostsStyles.container}>
      <h2>{relatedTitle}</h2>
      <div className={RelatedPostsStyles.ctaWrapper}>
        <CtaLink to="blog">See all blog posts</CtaLink>
      </div>
      {footerPosts.map(post => (
        <div key={post.slug} className={RelatedPostsStyles.post}>
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

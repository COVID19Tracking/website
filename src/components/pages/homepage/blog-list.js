import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Byline } from '~components/pages/blog/byline'
import CleanSpacing from '~components/utils/clean-spacing'
import Container from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import blogListStyles from './blog-list.module.scss'

const HomepageBlogList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        sort: { fields: publishDate, order: DESC }
        limit: 3
      ) {
        nodes {
          title
          slug
          overrideBlogPage
          overrideBlogPath
          authors {
            name
            twitterLink
            link
            headshot {
              file {
                fileName
              }
              resize(width: 100) {
                width
                height
                src
              }
            }
          }
          publishDate(formatString: "MMMM D, YYYY")
          lede {
            lede
          }
        }
      }
    }
  `)
  const posts = data.allContentfulBlogPost.nodes
  return (
    <Container>
      <h2>Our analysis &amp; updates</h2>
      <div className={blogListStyles.container}>
        <ul className={`press-list ${blogListStyles.blogList}`}>
          {posts.map(node => (
            <li
              key={`homepage-blog-${node.slug}`}
              className={blogListStyles.blogItem}
            >
              <h2>
                <Link
                  to={
                    node.overrideBlogPage
                      ? node.overrideBlogPath
                      : `/blog/${node.slug}`
                  }
                >
                  {node.title}
                </Link>
              </h2>
              <p className={blogListStyles.lede}>
                <CleanSpacing>{node.lede.lede}</CleanSpacing>
              </p>
              <Byline
                authors={node.authors}
                published={node.publishDate}
                smallmargin
              />
            </li>
          ))}
        </ul>
        <CtaLink to="/blog" centered>
          See more from our blog
        </CtaLink>
      </div>
    </Container>
  )
}

export default HomepageBlogList

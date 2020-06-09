import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import pressListStyle from '~components/common/press-list.module.scss'
import { Byline } from '~components/pages/blog/byline'
import CleanSpacing from '~components/utils/clean-spacing'
import Container from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Paragraph from '~components/common/landing-page/paragraph'
import blogListStyles from './blog-list.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        sort: { fields: publishDate, order: DESC }
        limit: 3
      ) {
        nodes {
          title
          slug
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
    <div className={blogListStyles.wrapper}>
      <Container>
        <Paragraph>
          See how we work, what we&#8217;re learning, and what&#8217;s changing
          in our data on our project blog.
        </Paragraph>
        <div className={blogListStyles.container}>
          <ul className={`press-list ${pressListStyle.pressList}`}>
            {posts.map(node => (
              <li
                key={`homepage-blog-${node.slug}`}
                className={blogListStyles.blogItem}
              >
                <h2>
                  <Link to={`/blog/${node.slug}`}>{node.title}</Link>
                </h2>
                <p className={blogListStyles.lede}>
                  <CleanSpacing>{node.lede.lede}</CleanSpacing>
                </p>
                <Byline
                  authors={node.authors}
                  date={node.publishDate}
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
    </div>
  )
}

import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Container from '~components/common/container'
import { CtaLink } from '~components/common/call-to-action'
import { Row } from '~components/common/grid'
import contentStyle from './content.module.scss'

const PostList = ({ posts }) => (
  <ul className={contentStyle.list}>
    {posts.map(post => (
      <li>
        <Link to={`/analysis-updates/${post.slug}`}>
          {post.homepageTitle ? post.homepageTitle : post.title}
        </Link>
      </li>
    ))}
  </ul>
)

const HomepageContent = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogCategory(
        filter: { addHomepage: { eq: true } }
        sort: { fields: name }
      ) {
        nodes {
          slug
          name
          homepageName
          description {
            childMarkdownRemark {
              html
            }
          }
          blog_post {
            slug
            title
            publishDate(formatString: "X")
            homepageTitle
          }
        }
      }
      allContentfulBlogPost(
        sort: { order: DESC, fields: publishDate }
        limit: 6
      ) {
        nodes {
          slug
          title
          publishDate(formatString: "X")
          homepageTitle
        }
      }
    }
  `)

  return (
    <Container className={contentStyle.wrapper}>
      <h2 className="a11y-only">Our Analysis</h2>
      <Row>
        {data.allContentfulBlogCategory.nodes.map(category => (
          <div className={contentStyle.category}>
            <h3>
              {category.homepageName ? category.homepageName : category.name}
            </h3>
            {category.description && (
              <div
                className={contentStyle.description}
                dangerouslySetInnerHTML={{
                  __html: category.description.childMarkdownRemark.html,
                }}
              />
            )}
            <ul className={contentStyle.list}>
              <PostList
                posts={category.blog_post
                  .sort((a, b) =>
                    parseInt(a.publishDate, 10) > parseInt(b.publishDate, 10)
                      ? -1
                      : 1,
                  )
                  .slice(0, 5)}
              />
            </ul>

            <CtaLink
              block
              bold
              to={`/analysis-updates/category/${category.slug}`}
            >
              Read all {category.name} posts
            </CtaLink>
          </div>
        ))}
        <div className={contentStyle.category}>
          <h3>All Our Analysis &amp; Updates</h3>
          <PostList posts={data.allContentfulBlogPost.nodes} />
          <CtaLink block bold to="/analysis-updates">
            Read all Our Analysis &amp; Updates
          </CtaLink>
        </div>
      </Row>
    </Container>
  )
}

export default HomepageContent

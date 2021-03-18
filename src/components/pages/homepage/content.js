import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Container from '~components/common/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import { Row } from '~components/common/grid'
import contentStyle from './content.module.scss'

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
          description {
            childMarkdownRemark {
              html
            }
          }
          blog_post {
            slug
            title
            publishDate(formatString: "X")
          }
        }
      }
    }
  `)

  return (
    <Container className={contentStyle.wrapper}>
      <h2>Our Analysis</h2>
      <CtaLink bold block to="/analysis-updates">
        Read all our analysis and updates
      </CtaLink>
      <Row>
        {data.allContentfulBlogCategory.nodes.map(category => (
          <div className={contentStyle.category}>
            <h3>{category.name}</h3>
            {category.description && (
              <div
                className={contentStyle.description}
                dangerouslySetInnerHTML={{
                  __html: category.description.childMarkdownRemark.html,
                }}
              />
            )}
            <ul className={contentStyle.list}>
              {category.blog_post
                .sort((a, b) =>
                  parseInt(a.publishDate, 10) > parseInt(b.publishDate, 10)
                    ? -1
                    : 1,
                )
                .slice(0, 5)
                .map(post => (
                  <li>
                    <Link to={`/analysis-updates/${post.slug}`}>
                      {post.title}
                    </Link>
                  </li>
                ))}
            </ul>

            <CtaLink block to={`/analysis-updates/category/${category.slug}`}>
              Read all {category.name} posts
            </CtaLink>
          </div>
        ))}
      </Row>
    </Container>
  )
}

export default HomepageContent

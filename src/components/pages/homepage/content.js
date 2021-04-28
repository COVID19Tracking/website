import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Container from '~components/common/container'
import { CtaLink } from '~components/common/call-to-action'
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
                      {post.homepageTitle ? post.homepageTitle : post.title}
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

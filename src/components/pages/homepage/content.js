import React, { Fragment } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Container from '~components/common/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
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
            publishDate(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  `)

  return (
    <Container>
      <h2>Our Analysis</h2>
      <CtaLink bold block extraMargin to="/analysis-updates">
        Read all our analysis and updates
      </CtaLink>
      {data.allContentfulBlogCategory.nodes.map(category => (
        <Fragment key={category.slug}>
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
            {category.blog_post.map(post => (
              <li>
                <Link to={`/analysis-updates/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </Container>
  )
}

export default HomepageContent

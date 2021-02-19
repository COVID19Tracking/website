import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import blogStyle from './blog.module.scss'
import CleanSpacing from '~components/utils/clean-spacing'

const BlogFeatured = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost(
        limit: 5
        sort: { fields: publishDate, order: DESC }
      ) {
        nodes {
          title
          featureOnHomepage
          publishDate(formatString: "MMMM D, YYYY")
          homepageImage {
            fixed(width: 800) {
              src
              srcSet
            }
          }
          slug
          lede {
            lede
          }
        }
      }
    }
  `)
  const { nodes } = data && data.allContentfulBlogPost
  if (!nodes) {
    return null
  }
  let hasFeatured = false
  const posts = nodes
    .map(node => {
      if (!hasFeatured && node.featureOnHomepage) {
        hasFeatured = true
        return false
      }
      return node
    })
    .filter(item => item)
    .slice(0, 2)
  return (
    <>
      <Row>
        {posts.map((post, index) => (
          <Col
            width={[4, 6, 6]}
            className={blogStyle.post}
            paddingRight={index === 0 && [0, 0, 32]}
            paddingLeft={index === 1 && [0, 0, 32]}
            paddingBottom={[32, 0, 0]}
          >
            <div className={blogStyle.date}>{post.publishDate}</div>
            <h3>
              <Link to={`/analysis-updates/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className={blogStyle.lede}>
              <CleanSpacing>{post.lede.lede}</CleanSpacing>
            </div>
            {post.homepageImage && (
              <img
                src={post.homepageImage.fixed.src}
                className={blogStyle.image}
                srcSet={post.homepageImage.fixed.srcSet}
                alt=""
                aria-hidden
              />
            )}
            <Link
              to={`/analysis-updates/${post.slug}`}
              className={blogStyle.link}
            >
              Read the article<span aria-hidden> →</span>
              <span className="a11y-only">{post.title}</span>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default BlogFeatured

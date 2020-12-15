import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import blogStyle from './blog.module.scss'
import CleanSpacing from '~components/utils/clean-spacing'

const BlogFeatured = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost(
        filter: { featureOnHomepage: { ne: true } }
        limit: 2
        sort: { fields: publishDate, order: DESC }
      ) {
        nodes {
          title
          publishDate(formatString: "MMMM d, yyy")
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
  return (
    <>
      <Row>
        {nodes.map(post => (
          <Col width={[4, 6, 6]} className={blogStyle.post}>
            <div className={blogStyle.date}>{post.publishDate}</div>
            <h3>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className={blogStyle.lede}>
              <CleanSpacing>{post.lede.lede}</CleanSpacing>
            </div>
            {post.homepageImage && (
              <img
                src={post.homepageImage.fixed.src}
                srcSet={post.homepageImage.fixed.srcSet}
                alt=""
                aria-hidden
              />
            )}
            <Link to={`/blog/${post.slug}`} className={blogStyle.link}>
              Read the article<span aria-hidden> →</span>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default BlogFeatured

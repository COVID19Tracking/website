import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import classnames from 'classnames'
import { Col, Row } from '~components/common/grid'
import blogStyle from './blog.module.scss'
import CleanSpacing from '~components/utils/clean-spacing'

const BlogFeatured = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost(
        filter: { featureOnHomepage: { eq: true } }
        limit: 1
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
  const post = data && data.allContentfulBlogPost.nodes[0]
  if (!data) {
    return null
  }
  return (
    <section className={blogStyle.section}>
      <h2>Our analysis &amp; updates</h2>
      <Row className={classnames(blogStyle.post, blogStyle.featured)}>
        <Col width={[4, 4, 6]}>
          <div className={blogStyle.date}>{post.publishDate}</div>
          <h3>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <div className={blogStyle.lede}>
            <CleanSpacing>{post.lede.lede}</CleanSpacing>
          </div>
          <Link to={`/blog/${post.slug}`} className={blogStyle.link}>
            Read the article<span aria-hidden> →</span>
          </Link>
        </Col>
        <Col width={[4, 4, 6]}>
          <img
            src={post.homepageImage.fixed.src}
            srcSet={post.homepageImage.fixed.srcSet}
            alt=""
            aria-hidden
          />
        </Col>
      </Row>
    </section>
  )
}

export default BlogFeatured

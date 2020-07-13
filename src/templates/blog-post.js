import React from 'react'
import { graphql } from 'gatsby'
import Hero from '~components/pages/blog/blog-hero'
import Layout from '~components/layout'
import FeaturedImage from '~components/pages/blog/featured-image'
import BlogPostContent from '~components/pages/blog/blog-content'
import BlogPostFootnotes from '~components/pages/blog/blog-footnotes'
import BlogPostExtras from '~components/pages/blog/blog-extras'

export default ({ data, path }) => {
  const blogPost = data.contentfulBlogPost
  const blogImages = {}
  data.allContentfulContentBlockImage.nodes.forEach(image => {
    blogImages[image.contentful_id] = image
  })
  const socialCard = blogPost.socialCard || { description: blogPost.lede.lede }
  const hero = (
    <Hero
      categories={blogPost.categories}
      headline={blogPost.title}
      authors={blogPost.authors}
      date={blogPost.publishDate}
      lede={blogPost.lede.lede}
      id={blogPost.id}
    />
  )

  return (
    <Layout
      title={`Blog | ${blogPost.title}`}
      displayTitle="Blog"
      socialCard={socialCard}
      returnLink="/blog"
      returnLinkTitle="All posts"
      path={path}
      hero={hero}
      centerTitle
    >
      {blogPost.featuredImage && (
        <FeaturedImage image={blogPost.featuredImage} />
      )}
      <BlogPostContent
        content={blogPost.childContentfulBlogPostBlogContentRichTextNode.json}
        images={blogImages}
      />
      {blogPost.childContentfulBlogPostFootnotesTextNode && (
        <BlogPostFootnotes
          footnotes={
            blogPost.childContentfulBlogPostFootnotesTextNode
              .childMarkdownRemark.html
          }
        />
      )}
      <BlogPostExtras blogPost={blogPost} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!, $blogImages: [String]) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
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
      socialCard {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
      relatedBlogPosts {
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
      categories {
        name
        slug
        blog_post {
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
      childContentfulBlogPostBlogContentRichTextNode {
        json
      }
      featuredImage {
        resize(width: 900) {
          src
        }
        title
      }
      slug
      lede {
        lede
      }
      publishDate(formatString: "MMMM D, YYYY")
      childContentfulBlogPostBodyTextNode {
        childMarkdownRemark {
          html
        }
      }

      childContentfulBlogPostFootnotesTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulContentBlockImage(
      filter: { contentful_id: { in: $blogImages } }
    ) {
      nodes {
        contentful_id
        image {
          title
          fluid(maxWidth: 2000, sizes: "4") {
            aspectRatio
            sizes
            src
            srcSet
          }
        }
      }
    }
  }
`

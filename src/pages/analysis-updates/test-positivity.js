import React from 'react'
import { graphql } from 'gatsby'
import Container from '~components/common/container'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import BlogPostExtras from '~components/pages/blog/footer/blog-extras'
import Hero from '~components/pages/blog/blog-hero'

import pooled0 from '~images/experiments/pooled_testing_00.jpg'
import pooled1 from '~images/experiments/pooled_testing_01.jpg'
import pooled2 from '~images/experiments/pooled_testing_02.jpg'
import pooled3 from '~images/experiments/pooled_testing_03.jpg'
import pooled4 from '~images/experiments/pooled_testing_04.jpg'
import pooled5 from '~images/experiments/pooled_testing_05.jpg'
import pooled6 from '~images/experiments/pooled_testing_06.jpg'
import pooled7 from '~images/experiments/pooled_testing_07.jpg'

import ScrollyTelling from '~components/pages/blog-features/scrollytelling'

const firstScrollytellingImages = [
  pooled0,
  pooled1,
  pooled2,
  pooled3,
  pooled4,
  pooled5,
]
const secondScrollytellingImages = [pooled6, pooled7]

const firstScrollytellingCopy = [
  'Let’s consider a state where a group of 100 people have been tested for COVID-19.',
  'Out of these 100, only three people received a positive test result.',
  'In this case, considering the <span>sample</span> of people who were tested, we would say the test positivity in this particular population is 3 percent.',
  'But testing is limited in this state, so it’s impossible to test 100 percent of a population. By zooming out and looking at the entire population of the state, we can see how the sample we selected is not an accurate representation of the larger population.',
  'Test positivity reflects the percentage of <em>people tested</em> who have the virus, but not necessarily the percentage of people who have the virus in the <em>entire population</em>. That means test positivity only shows a portion of reality. In this example, if we had tested a different <span>sample</span> of people, the test positivity in our imaginary state would have varied anywhere from 1 to 16 percent, even though the prevalence is the same.',
  'The choice of who gets tested is based on state- or county-specific criteria, but is often made based on how sick people appear to be, which in turn influences test positivity. If a state only tests people who have clear symptoms of the virus, it will likely have a higher test positivity than one that is also testing asymptomatic people.',
]

const secondScrollytellingCopy = [
  'Just as test positivity can paint a biased picture of a specific state’s outbreak, it’s also imperfect when used to compare two different states or regions. Let’s look at two states with the same test positivity calculated based on the same period of time.',
  'Even though the sample of people tested in both states shows the same test positivity, the overall prevalence of the virus—something we don’t see in the test results—can be very different.',
]

const TestPositivityBlogPost = ({ data }) => {
  const blogPost = data.contentfulBlogPost

  const socialCard = blogPost.socialCard || { description: blogPost.lede.lede }
  const hero = (
    <Hero
      categories={blogPost.categories}
      headline={blogPost.title}
      authors={blogPost.authors}
      published={blogPost.publishDate}
      updated={blogPost.updateDateTime}
      lede={blogPost.lede.lede}
      id={blogPost.contentful_id}
      twitterText={blogPost.twitterText || false}
    />
  )
  const Snippet = ({ slug }) => {
    const item = data.contentfulSnippetCollection.snippets.find(
      snippet => snippet.slug === slug,
    )
    return (
      <ContentfulContent
        id={item.contentful_id}
        content={
          item.childContentfulSnippetContentTextNode.childMarkdownRemark.html
        }
      />
    )
  }

  const title = 'Test Positivity: So Valuable, So Easy to Misinterpret'
  return (
    <Layout
      title={title}
      displayTitle="Blog"
      socialCard={socialCard}
      path="/analysis-updates/test-positivity"
      centerTitle
      hero={hero}
    >
      <Container centered>
        <LongContent>
          <Snippet slug="tpp-intro" />
        </LongContent>
      </Container>

      <ScrollyTelling
        copy={firstScrollytellingCopy}
        images={firstScrollytellingImages}
      />

      <Container centered>
        <h3>Comparing States or Regions</h3>
      </Container>

      <ScrollyTelling
        copy={secondScrollytellingCopy}
        images={secondScrollytellingImages}
      />

      <Container centered>
        <LongContent>
          <Snippet slug="tpp-conclusion" />
        </LongContent>
      </Container>
      <BlogPostExtras blogPost={blogPost} />
    </Layout>
  )
}

export default TestPositivityBlogPost

export const query = graphql`
  {
    contentfulSnippetCollection(slug: { eq: "test-positivity-post" }) {
      snippets {
        contentful_id
        slug
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    contentfulBlogPost(
      overrideBlogPath: { eq: "/blog/test-positivity" }
      overrideBlogPage: { eq: true }
    ) {
      contentful_id
      title
      updateDateTime
      twitterText
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
        updateDateTime
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
      childContentfulBlogPostFootnotesTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

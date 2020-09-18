import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import Paragraph from '~components/common/landing-page/paragraph'

import pooled0 from '~images/experiments/pooled_testing_00.jpg'
import pooled1 from '~images/experiments/pooled_testing_01.jpg'
import pooled2 from '~images/experiments/pooled_testing_02.jpg'
import pooled3 from '~images/experiments/pooled_testing_03.jpg'
import pooled4 from '~images/experiments/pooled_testing_04.jpg'
import pooled5 from '~images/experiments/pooled_testing_05.jpg'
import pooled6 from '~images/experiments/pooled_testing_06.jpg'
import pooled7 from '~images/experiments/pooled_testing_07.jpg'

import ScrollyTelling from '~components/pages/experiments/scrollytelling'

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
  'Out of these 100, only three people received a positive test.',
  'In this case, considering the <span>sample</span> of people who were tested, we would say the percent positive in this particular population is 3%.',
  'But testing is limited and it’s impossible to test 100% of a population. By zooming out and looking at the entire population of the state, we can see how a lot of cases were not identified by our testing sample.',
  'Test positivity reflects the percentage of people tested who have the virus, but not necessarily the percentage of people who have the virus in the entire population. As such, test positivity percent positive only shows a portion of reality. In this example, if we had tested a different <span>sample</span> of people, the test positivity in our imaginary state would have varied anywhere from 1 to 16%.',
  'The choice of who gets tested is based on varying state or county-specific criteria, but is often made based on how sick people appear to be, which influences test positivity. If a state only tests people who have clear symptoms of the virus, it will likely have a higher percent positive than one that is also testing asymptomatic people.',
]

const secondScrollytellingCopy = [
  "Just like test positivity can paint a biased picture of a specific state’s outbreak, it's also imperfect when used to compare two different states or regions. Let’s look at two states with the same test positivity calculated based on the same period of time.",
  'Even though the sample of people tested in both states shows the same test positivity during the same period of time, the overall prevalence of the virus — something we don’t see in the test results — can be very different.',
]

const TestPositivityBlogPost = ({ data }) => {
  const blogPost = {
    socialCard: {
      title: 'Test Positivity',
      description: `Test positivity is extremely useful, but it has also become
      one of the most commonly misunderstood metrics for monitoring the COVID-19
      pandemic.`,
    },
  }
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

  const socialCard = blogPost.socialCard || { description: blogPost.lede.lede }

  return (
    <Layout
      title="Test Positivity is a Valuable Metric, When Calculated Correctly"
      displayTitle="Blog"
      socialCard={socialCard}
      path="/blog/test-positivity"
      centerTitle
    >
      <Container centered>
        <Paragraph>
          <span
            dangerouslySetInnerHTML={{
              __html: marked.inlineLexer(data.lede.content.content, []),
            }}
          />
        </Paragraph>
      </Container>
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
        <LongContent>
          <Snippet slug="tpp-track" />
        </LongContent>
      </Container>

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
    </Layout>
  )
}

export default TestPositivityBlogPost

export const query = graphql`
  {
    lede: contentfulSnippet(slug: { eq: "tpp-lede" }) {
      content {
        content
      }
    }
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
  }
`

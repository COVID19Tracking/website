import React from 'react'
import loadable from '@loadable/component'
import Container from '~components/common/container'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import Paragraph from '~components/common/landing-page/paragraph'

import pooled0 from '~images/experiments/pooled_testing_00.jpg'
import pooled1 from '~images/experiments/pooled_testing_01.jpg'
import pooled2 from '~images/experiments/pooled_testing_02.jpg'
import pooled3 from '~images/experiments/pooled_testing_03.jpg'
import pooled4 from '~images/experiments/pooled_testing_04.jpg'
import pooled5 from '~images/experiments/pooled_testing_05.jpg'
import pooled6 from '~images/experiments/pooled_testing_06.jpg'
import pooled7 from '~images/experiments/pooled_testing_07.jpg'

const ScrollyTelling = loadable(() =>
  import('~components/pages/experiments/scrollytelling'),
)

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

const TestPositivityBlogPost = () => {
  const blogPost = {
    socialCard: {
      title: 'Test Positivity',
      description: `Test positivity is extremely useful, but it has also become
      one of the most commonly misunderstood metrics for monitoring the COVID-19
      pandemic.`,
    },
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
          Test Positivity is a Valuable Metric, When Calculated Correctly
        </Paragraph>
        <h4>
          Calculating test positivity is extremely useful, but it has also
          become one of the most commonly misunderstood metrics for monitoring
          the COVID-19 pandemic. Here, we take a step back and look at what it
          really means.
        </h4>
      </Container>
      <Container centered>
        <LongContent>
          <p>
            In an ideal world, we would know exactly how many active COVID-19
            infections there are in the United States at a given time — a
            proportion known as disease prevalence.
          </p>
          <p>
            Although it’s hard to measure COVID-19 viral prevalence, we can
            collect “confirmed cases,” which correspond to the number of viral
            diagnostic tests that come back positive. By dividing this number by
            the total number of reported tests and multiplying the result by
            100%, we get a test positivity rate, also known as percent positive
            rate.
          </p>
          <p>
            While the testing strategy allows for a grasp of the viral
            prevalence, it poses a big challenge: you can only see what you find
            in test results.
          </p>
        </LongContent>
      </Container>

      <ScrollyTelling
        copy={firstScrollytellingCopy}
        images={firstScrollytellingImages}
      />

      <Container centered>
        <LongContent>
          <p>
            At The COVID Tracking Project, we track four major statistics on a
            state level: tests, cases, current hospitalizations, and deaths.
            Each of these metrics tells us something different about the virus
            but has its own bias in how the number is collected. Both cases and
            tests, for example, depend on who is getting tested.
          </p>
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
          <p>
            In this extreme example, State A has over three times as many
            infections as State B, even though both have 6% of tests coming back
            positive. This could be explained by differences in who is getting
            tested.
          </p>

          <p>
            Percent positive is a confusing statistic because it’s affected by
            two factors: viral prevalence and testing distribution. When
            analyzing test positivity, it’s important to look at the full
            picture to figure out which one of these factors is driving the
            change in the number.
          </p>

          <p>
            Recent college reopenings provide a concrete example of why
            understanding the limitations of test positivity is important. At
            the University of Notre Dame, a local news source accurately reports
            that test positivity is “fewer than half a percent” when the fall
            semester started and 12,000 people were tested. However, they also
            state that, a few days later, “15 new infections out of only 30
            tests” were found, which represented a “50% positive rate.” 
          </p>

          <p>
            Although there is technically nothing wrong with this calculation,
            it is misleading to imply that the test positivity percent positive
            changed from {`<1% to 50%`}. The original sample had the purpose of
            testing everybody, regardless of their symptoms, upon their arrival
            to campus, with thousands of tests performed. In contrast, only 30
            tests were performed in the second weekend dataset. It’s also
            unclear if the 30 tests performed were on individuals with symptoms
            or if these individuals had recent contacts of the virus. Even if
            calculated correctly, the test positivity numbers are  misleading
            when compared against one another since two very different sets of
            people were tested in each situation.
          </p>

          <p>
            While this is an extreme example, it’s important to understand the
            limitations of the test positivity metric and be precise about why
            the rate is changing. Rises in test positivity are concerning for
            different reasons. It could be because different people are being
            tested, and more tests should be performed to have a better handle
            of the outbreak. Or it could be because there is a rise in cases. 
          </p>

          <p>
            Here at The COVID Tracking Project, we strive to provide a
            transparent national dataset that contextualizes the limitations of
            our statistics. While this blog post describes how test positivity
            can be used when it is calculated perfectly, our test positivity
            data definitions blog post further explains which of our numbers
            should be used to best calculate this statistic. We’ve also
            previously written about how we can use the{' '}
            <a href="https://covidtracking.com/blog/the-other-covid-19-metric">
              inverse value of
            </a>{' '}
            test positivity.
          </p>

          <p>
            In our analyses, when we calculate test positivity, we only do so in
            the context of hospitalizations and deaths. We report the daily
            numbers, but we especially value weekly trends over time. We also
            rely on reporting and fact-checking to understand the state of an
            outbreak. Although test positivity is useful, it can be extremely
            misleading if taken out of context.  
          </p>
        </LongContent>
      </Container>
    </Layout>
  )
}

export default TestPositivityBlogPost

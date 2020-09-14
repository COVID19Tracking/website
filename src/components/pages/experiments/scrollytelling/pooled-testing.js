import React, { useState } from 'react'

import Layout from '~components/layout'

import styles from './pooled-testing.module.scss'

// these next two can only be loaded clientside
import { Scrollama, Step } from '~utilities/react-scrollama'

const copy = [
  'Let’s consider a state where a group of 100 people have been tested for COVID-19.',
  'Out of these 100, only three people received a positive test.',
  'In this case, considering the sample of people who were tested, we would say the percent positive in this particular population is 3%.',
  'But testing is limited and it’s impossible to test 100% of a population. By zooming out and looking at the entire population of the state, we can see how a lot of cases were not identified by our testing sample.',
  'Just like testing, percent positive only shows a subset of reality. In this example, if we had tested a different [sample] of people, the percent positive in our imaginary state would have varied anywhere from 1 to 16%.',
  'The choice of who gets tested is based on varying state or county-specific criteria, but is often made based on how sick people appear to be, which influences percent positive. If a state only tests people who have clear symptoms of the virus, it will likely have a higher percent positive than one that is also testing asymptomatic people.',
  'Just like percent positive can paint a biased picture of a specific state’s outbreak, the metric is also imperfect when used to compare two different states or regions. Let’s look at two states with the same percent positive calculated based on the same period of time.',
]

export default ({ images }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = props => setCurrentStepIndex(props.data)

  return (
    <Layout
      title="Percent Positive"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      path="/data"
    >
      <div>
        <div className={styles.stickyImage}>
          {currentStepIndex !== null && (
            <img src={images[currentStepIndex]} alt="test" />
          )}
        </div>
        <div>
          <Scrollama onStepEnter={onStepEnter} offset={0.55}>
            {images.map((data, index) => (
              <Step data={index} key={JSON.stringify(data)}>
                <div className={styles.stepInner}>
                  <span className={styles.text}>{copy[index]}</span>
                </div>
              </Step>
            ))}
          </Scrollama>
          <div className={styles.stepInner} />
        </div>
      </div>
    </Layout>
  )
}

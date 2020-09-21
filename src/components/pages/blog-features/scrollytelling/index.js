import React, { useState } from 'react'

import styles from './scrollytelling.module.scss'

// these next two can only be loaded clientside
import { Scrollama, Step } from 'react-scrollama'

export default ({ copy, images }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = props => setCurrentStepIndex(props.data)

  return (
    <div className={styles.scrollyContainer}>
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
                <span
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: copy[index] }}
                />
              </div>
            </Step>
          ))}
        </Scrollama>
        <div className={styles.stepInner} />
      </div>
    </div>
  )
}

import React from 'react'
import classnames from 'classnames'
import featureStyle from '~components/common/landing-page/feature.module.scss'

const FeatureInfo = ({ title, text }) => (
  <>
    {title && <h3>{title}</h3>}
    <p>{text}</p>
  </>
)
export default ({ element, title, children, flip = false }) => (
  <div
    className={classnames(
      featureStyle.feature,
      flip && featureStyle.flip,
      !element && featureStyle.noElement,
    )}
  >
    {element ? (
      <>
        <div className={featureStyle.element}>{element}</div>
        <div className={featureStyle.info}>
          <FeatureInfo title={title} text={children} />
        </div>
      </>
    ) : (
      <FeatureInfo title={title} text={children} />
    )}
  </div>
)

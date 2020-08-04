import React from 'react'
import DetailText from '~components/common/detail-text'
import stateContactStyle from './state-contact.module.scss'

export default ({ currentState, governors }) => {
  const currentGovernor = governors.find(
    governor => governor.state_name === currentState,
  )
  if (currentGovernor === undefined) {
    return null
  }
  // remove dashes for tel: link
  const phoneNumber = currentGovernor.phone.replace(/-/g, '')
  return (
    <div className={stateContactStyle.container}>
      <ul className={stateContactStyle.contactMethods}>
        <li>
          <span className={stateContactStyle.label}>Website:</span>{' '}
          <a href={currentGovernor.contact_page}>
            {currentGovernor.contact_page}
          </a>
        </li>
        <li>
          <span className={stateContactStyle.label}>Facebook:</span>{' '}
          <a href={currentGovernor.facebook_url}>Facebook</a>
        </li>
        <li>
          <span className={stateContactStyle.label}>Twitter:</span>{' '}
          <a href={currentGovernor.twitter_url}>
            @{currentGovernor.twitter_handle}
          </a>
        </li>
        <li>
          <span className={stateContactStyle.label}>Phone:</span>{' '}
          <a href={`tel:${phoneNumber}`}>{currentGovernor.phone}</a>
        </li>
      </ul>
      <DetailText className={stateContactStyle.detail}>
        Source:{' '}
        <a href="https://civilserviceusa.github.io/us-governors/">
          Civil Services
        </a>
      </DetailText>
    </div>
  )
}

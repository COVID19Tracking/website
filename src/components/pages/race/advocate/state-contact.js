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
      <ul>
        <li>Website: {currentGovernor.contact_page}</li>
        <li>
          <a href="{currentGovernor.facebook_url}">Facebook</a>
        </li>
        <li>
          <a href="{currentGovernor.twitter_url}">
            Twitter ({currentGovernor.twitter_handle})
          </a>
        </li>
        <li>
          <a href={`tel:${phoneNumber}`}>Phone ({currentGovernor.phone})</a>
        </li>
      </ul>
      <DetailText>
        Source:{' '}
        <a href="https://civilserviceusa.github.io/us-governors/">
          Civil Services
        </a>
      </DetailText>
    </div>
  )
}

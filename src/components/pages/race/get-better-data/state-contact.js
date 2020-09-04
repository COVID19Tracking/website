import React from 'react'
import DetailText from '~components/common/detail-text'
import stateContactStyle from './state-contact.module.scss'

const StateContact = ({ currentState, governors }) => {
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
        {currentGovernor.phone && (
          <li>
            <span className={stateContactStyle.label}>Phone:</span>{' '}
            <a href={`tel:${phoneNumber}`}>{currentGovernor.phone}</a>
          </li>
        )}
        {currentGovernor.contact_page && (
          <li>
            <span className={stateContactStyle.label}>Website:</span>{' '}
            <a
              href={currentGovernor.contact_page}
              target="_blank"
              rel="noreferrer"
            >
              {currentGovernor.contact_page}
            </a>
          </li>
        )}
        <li>
          <span className={stateContactStyle.label}>Social media:</span>{' '}
          {currentGovernor.facebook_url && (
            <>
              <a
                href={currentGovernor.facebook_url}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              ,{' '}
            </>
          )}
          {currentGovernor.twitter_url && (
            <a
              href={currentGovernor.twitter_url}
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          )}
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

export default StateContact

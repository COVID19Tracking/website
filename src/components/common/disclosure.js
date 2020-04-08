import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import disclosureStyle from './disclosure.module.scss'

export default ({ title, children }) => (
  <Disclosure>
    <DisclosureButton
      className={`disclosure-button ${disclosureStyle.disclosureButton}`}
    >
      <span
        className={`disclosure-button-toggle ${disclosureStyle.disclosureButtonTogle}`}
      ></span>
      {title}
    </DisclosureButton>
    <DisclosurePanel>{children}</DisclosurePanel>
  </Disclosure>
)

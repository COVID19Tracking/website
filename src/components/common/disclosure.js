import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import '../../scss/components/common/disclosure.scss'

export default ({ title, children }) => (
  <Disclosure>
    <DisclosureButton className="disclosure-button">
      <span className="disclosure-button-toggle"></span>
      {title}
    </DisclosureButton>
    <DisclosurePanel>{children}</DisclosurePanel>
  </Disclosure>
)

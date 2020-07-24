import React, { useState } from 'react'
import classnames from 'classnames'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import stateNavStyle from './state-nav.module.scss'

export default ({ stateList, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TabletDisclosure
      className={classnames(stateNavStyle.container, className)}
      sticky
    >
      <TabletDisclosureHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={stateNavStyle.header}
      >
        <h3>Jump to a state</h3>
      </TabletDisclosureHeader>
      <TabletDisclosureContent
        isOpen={isOpen}
        className={stateNavStyle.content}
      >
        <ul>
          {stateList.map(state => (
            <li key={state.state}>
              <a href={`#state-${state.state.toLowerCase()}`}>{state.state}</a>
            </li>
          ))}
        </ul>
      </TabletDisclosureContent>
    </TabletDisclosure>
  )
}

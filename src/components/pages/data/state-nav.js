import React, { useState } from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import classnames from 'classnames'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import stateNavStyle from './state-nav.module.scss'

export default ({ stateList, className, externalLinks = false }) => {
  /*
  Displays a navigation to jump between states.

  stateList: a list of states
  className: an additional classname for the container
  externalLinks: indicates if the state links should be anchor links or not.
    true: external, use gatsby Links
    false: not external, use anchor links
  */
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
          {stateList.map(state => {
            if (externalLinks) {
              return (
                <li key={state.state}>
                  <Link to={`/data/state/${slugify(state.name).toLowerCase()}`}>
                    {state.state}
                  </Link>
                </li>
              )
            }
            return (
              <li key={state.state}>
                <a href={`#state-${slugify(state.state).toLowerCase()}`}>
                  {state.state}
                </a>
              </li>
            )
          })}
        </ul>
      </TabletDisclosureContent>
    </TabletDisclosure>
  )
}

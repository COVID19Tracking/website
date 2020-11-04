import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import stateNavStyle from './state-nav.module.scss'

const StateNav = ({ className, linkAs, defaultIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const data = useStaticQuery(graphql`
    {
      allCovidStateInfo(sort: { fields: name }) {
        nodes {
          state
          name
          childSlug {
            slug
          }
        }
      }
    }
  `)
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
          {data.allCovidStateInfo.nodes.map(state => (
            <li key={state.state}>{linkAs({ state })}</li>
          ))}
        </ul>
      </TabletDisclosureContent>
    </TabletDisclosure>
  )
}

export default StateNav

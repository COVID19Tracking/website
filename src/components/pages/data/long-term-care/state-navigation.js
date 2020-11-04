import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import classnames from 'classnames'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import stateNavStyle from '../state-nav.module.scss'

const LtcStateNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const data = useStaticQuery(graphql`
    {
      allCovidStateInfo {
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
    <TabletDisclosure className={classnames(stateNavStyle.container)}>
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
            <li key={state.state}>
              <Link
                to={`/data/state/${state.childSlug.slug}/long-term-care`}
                aria-label={state.name}
              >
                {state.state}
              </Link>
            </li>
          ))}
        </ul>
      </TabletDisclosureContent>
    </TabletDisclosure>
  )
}

export default LtcStateNav

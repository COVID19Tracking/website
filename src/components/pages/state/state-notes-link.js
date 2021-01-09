import React from 'react'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import stateNotesLinkStyle from './state-notes-link.module.scss'

const StateNotesLink = ({ state }) => (
  <CtaLink
    bold
    className={stateNotesLinkStyle.link}
    to={`/data/state/${state.childSlug.slug}/notes`}
  >
    What you need to know about this data
  </CtaLink>
)

export default StateNotesLink

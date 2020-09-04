import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import cardStyles from './card.module.scss'

const CardDisclosure = ({ children }) => (
  <div className={cardStyles.disclosure}>
    <Disclosure>{children}</Disclosure>
  </div>
)

const CardDisclsoureButton = ({ closed, expanded }) => (
  <DisclosureButton>
    <span className={cardStyles.closed}>{closed}</span>
    <span className={cardStyles.expanded}>{expanded}</span>
  </DisclosureButton>
)

const CardDisclosurePanel = ({ children }) => (
  <DisclosurePanel>{children}</DisclosurePanel>
)

const CardBody = ({ children }) => (
  <div className={cardStyles.body}>{children}</div>
)

const CardNote = ({ children }) => <p className={cardStyles.note}>{children}</p>

const Card = ({ title, link, children }) => (
  <div className={cardStyles.card}>
    {(title || link) && (
      <div className={cardStyles.header}>
        {title && <h3 className={cardStyles.title}>{title}</h3>}
        {link && <span className={cardStyles.link}>{link}</span>}
      </div>
    )}
    {children}
  </div>
)

export {
  Card,
  CardBody,
  CardNote,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
}

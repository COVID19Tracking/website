import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import cardStyles from './card.module.scss'

const CardDisclosure = ({ children }) => <Disclosure>{children}</Disclosure>

const CardDisclsoureButton = ({ children }) => (
  <DisclosureButton className={cardStyles.disclosureButton}>
    {children}
    <span className={cardStyles.arrowDown} aria-hidden>
      ↓
    </span>
    <span className={cardStyles.arrowUp} aria-hidden>
      ↑
    </span>
  </DisclosureButton>
)
const CardDisclosurePanel = ({ children }) => (
  <DisclosurePanel>{children}</DisclosurePanel>
)

const CardBody = ({ children }) => (
  <div className={cardStyles.body}>{children}</div>
)

const Card = ({ title, children }) => (
  <div className={cardStyles.card}>
    {title && <h3 className={cardStyles.title}>{title}</h3>}
    {children}
  </div>
)

export {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
}

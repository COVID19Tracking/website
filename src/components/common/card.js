import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePane } from '@reach/disclosure'
import cardStyles from './card.module.scss'

const CardDisclosure = ({ children }) => <Disclosure>{children}</Disclosure>

const CardDisclsoureButton = ({ children }) => (
  <DisclosureButton>{children}</DisclosureButton>
)
const CardDisclosurePane = ({ children }) => (
  <DisclosurePane>{children}</DisclosurePane>
)

const CardBody = ({ children }) => <div>{children}</div>

const Card = ({ title, children }) => (
  <div className={cardStyles.card}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
)

export {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePane,
}

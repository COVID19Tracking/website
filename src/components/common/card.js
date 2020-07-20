import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import DefinitionsPanel from '~components/common/state/definitions-panel'

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

const CardDefinition = ({ key, definition }) => (
  <div key={key} ref={definition.ref}>
    <span>{definition.name}</span>:
    <span dangerouslySetInnerHTML={{ __html: definition.content }} />
  </div>
)

// todo finish rendering
const CardDefinitionsPanel = ({ definitions, hideFunction }) => (
  <DefinitionsPanel hideFunction={hideFunction}>
    <h2>Definitions</h2>
    {Object.keys(definitions).map(key => (
      <CardDefinition key={key} definition={definitions[key]} />
    ))}
  </DefinitionsPanel>
)

const CardBody = ({ children }) => (
  <div className={cardStyles.body}>{children}</div>
)

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
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
  CardDefinitionsPanel,
}

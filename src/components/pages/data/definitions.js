import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import definitionStyles from './definitions.module.scss'

const Definitions = ({ definitions, order }) => {
  const orderedDefinitions = []
  order.forEach(field => {
    orderedDefinitions.push(
      definitions.find(definition => definition.fieldName === field),
    )
  })
  return (
    <>
      <h2>Definitions</h2>
      {orderedDefinitions.map(definition => (
        <Disclosure key={definition.name}>
          <DisclosureButton
            type="button"
            className={definitionStyles.definitionButton}
          >
            {definition.name}{' '}
            <span className={definitionStyles.arrowDown} aria-hidden>
              ↓
            </span>{' '}
            <span className={definitionStyles.arrowUp} aria-hidden>
              ↑
            </span>
          </DisclosureButton>
          <DisclosurePanel>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  definition.childContentfulDataDefinitionDefinitionTextNode
                    .childMarkdownRemark.html,
              }}
            />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </>
  )
}

export default Definitions

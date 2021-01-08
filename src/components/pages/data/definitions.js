import React, { useState } from 'react'
import definitionStyles from './definitions.module.scss'

const Definitions = ({ definitions, order }) => {
  const orderedDefinitions = []
  order.forEach(field => {
    orderedDefinitions.push(
      definitions.find(definition => definition.fieldName === field),
    )
  })
  const [expanded, setExpanded] = useState([])
  return (
    <>
      <h2>Definitions</h2>
      {orderedDefinitions.map((definition, key) => (
        <div key={`definition-${definition.name}`}>
          <button
            type="button"
            className={definitionStyles.definitionButton}
            aria-expanded={expanded.indexOf(key) > -1}
            aria-controls={`definition-pane--${key}`}
            onClick={event => {
              event.preventDefault()
              const current = [...expanded]
              if (expanded.indexOf(key) > -1) {
                current.splice(expanded.indexOf(key), 1)
              } else {
                current.push(key)
              }
              setExpanded(current)
            }}
          >
            {definition.name}{' '}
            <span className={definitionStyles.arrowDown} aria-hidden>
              ↓
            </span>{' '}
            <span className={definitionStyles.arrowUp} aria-hidden>
              ↑
            </span>
          </button>
          <div
            id={`definition-pane--${key}`}
            className={definitionStyles.pane}
            hidden={expanded.indexOf(key) === -1}
            dangerouslySetInnerHTML={{
              __html:
                definition.childContentfulDataDefinitionDefinitionTextNode
                  .childMarkdownRemark.html,
            }}
          />
        </div>
      ))}
    </>
  )
}

export default Definitions

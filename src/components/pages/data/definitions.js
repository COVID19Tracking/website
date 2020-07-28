import React, { useState } from 'react'
import { Row, Col } from '~components/common/grid'
import definitionStyles from './definitions.module.scss'

export default ({ definitions }) => {
  const [expanded, setExpanded] = useState([])
  return (
    <Row>
      <Col width={[4, 6, 3]}>
        <h3 className={definitionStyles.header}>Definitions</h3>
        <button
          className={definitionStyles.expandAll}
          type="button"
          onClick={() => {
            if (expanded.length === definitions.length) {
              setExpanded([])
              return
            }
            setExpanded(Array.from(definitions.keys()))
          }}
        >
          {expanded.length === definitions.length ? (
            <>Collapse all</>
          ) : (
            <>Expand all</>
          )}
        </button>
      </Col>
      <Col width={[4, 6, 9]} paddingLeft={[0, 0, 8]}>
        {definitions.map((definition, key) => (
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
      </Col>
    </Row>
  )
}

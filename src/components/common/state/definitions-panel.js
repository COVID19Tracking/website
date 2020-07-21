import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import closeIcon from '~images/icons/close-x.svg'
import definitionsPanelStyles from './definitions-panel.module.scss'

const Definition = ({ key, definition, highlighted }) => {
  const definitionRef = useRef(false)
  useEffect(() => {
    if (highlighted) {
      definitionRef.current.focus()
    }
  })

  return (
    <div
      key={key}
      ref={definitionRef}
      tabIndex="-1"
      className={classnames(
        definitionsPanelStyles.definition,
        highlighted && definitionsPanelStyles.highlight,
      )}
    >
      <span className={definitionsPanelStyles.title}>{definition.name}</span>:
      <span
        dangerouslySetInnerHTML={{
          __html:
            definition.childContentfulDataDefinitionDefinitionTextNode
              .childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

const DefinitionPanelContext = React.createContext()

const DefinitionPanel = ({ onHide, definitions, highlightedDefinition }) => {
  return (
    <div
      className={definitionsPanelStyles.definitionsPanel}
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      aria-labelledby="definitionsDialogLabel"
    >
      <div
        role="presentation"
        onKeyDown={event => {
          if (event.key === 'Escape') {
            onHide()
          }
        }}
      >
        <div className={definitionsPanelStyles.closePanelContainer}>
          <button
            type="button"
            className={definitionsPanelStyles.closePanel}
            onClick={onHide}
          >
            <img src={closeIcon} alt="Close panel." />
          </button>
        </div>
        <h2 id="definitionsDialogLabel">Definitions</h2>
        {Object.keys(definitions).map(key => (
          <Definition
            key={key}
            highlighted={definitions[key].fieldName === highlightedDefinition}
            definition={definitions[key]}
          />
        ))}
      </div>
    </div>
  )
}

export { DefinitionPanel, DefinitionPanelContext }

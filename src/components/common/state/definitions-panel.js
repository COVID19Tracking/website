import React from 'react'

import closeIcon from '~images/icons/close-x.svg'

import definitionsPanelStyles from './definitions-panel.module.scss'

const Definition = ({ key, definition }) => (
  <p key={key} ref={definition.ref}>
    <span className={definitionsPanelStyles.title}>{definition.name}</span>:
    <span
      dangerouslySetInnerHTML={{
        __html:
          definition.childContentfulDataDefinitionDefinitionTextNode
            .childMarkdownRemark.html,
      }}
    />
  </p>
)

const DefinitionPanelContext = React.createContext()

const DefinitionPanel = ({ onHide, definitions }) => {
  /*
  onHide is the function that will hide the entire definitions panel
  */

  // Should take up the whole screen below a certain breakpoint.
  // On opening of dialog, focus the definition.
  // Hitting escape should close the definition
  // OK - so then we should both use aria-describedby that points to basically
  // a direct child of the dialog that contains ALL descriptions
  // and then move focus to the highlighted definition

  return (
    <div
      className={definitionsPanelStyles.definitionsPanel}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-labelledby="definitionsDialogLabel"
    >
      <span id="definitionsDialogLabel" className="a11y-only">
        Data definitions
      </span>
      <div className={definitionsPanelStyles.closePanelContainer}>
        <button
          type="button"
          className={definitionsPanelStyles.closePanel}
          onClick={onHide}
        >
          <img src={closeIcon} alt="Close panel." />
        </button>
      </div>
      <h2>Definitions</h2>
      {Object.keys(definitions).map(key => (
        <Definition key={key} definition={definitions[key]} />
      ))}
    </div>
  )
}

export { DefinitionPanel, DefinitionPanelContext }

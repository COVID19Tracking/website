import React, { useRef, useEffect } from 'react'

import closeIcon from '~images/icons/close-x.svg'

import summaryStyles from './summary.module.scss'

export default ({ hideFunction }) => {
  /*
  hideFunction is the function that will hide the entire definitions panel
  */
  const closeButtonRef = useRef()

  useEffect(() => {
    closeButtonRef.current.focus()
  }, [])

  return (
    <div
      className={summaryStyles.definitionsPanel}
      role="dialog"
      aria-labelledby="definitionsDialogLabel"
    >
      <span id="definitionsDialogLabel" className="a11y-only">
        Data definitions
      </span>
      <div className={summaryStyles.closePanelContainer}>
        <button
          type="button"
          className={summaryStyles.closePanel}
          onClick={hideFunction}
          ref={closeButtonRef}
        >
          <img src={closeIcon} alt="Close panel." />
        </button>
      </div>
      <h2>Definitions</h2>
    </div>
  )
}

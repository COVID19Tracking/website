import React from 'react'
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import overlayStyles from './overlay.module.scss'

const Overlay = ({ children, close }) => (
  <>
    <div
      role="dialog"
      className={overlayStyles.overlay}
      onClick={() => close()}
      onKeyDown={() => close()}
    />
    <div className={overlayStyles.card} role="dialog">
      <button
        className={overlayStyles.close}
        type="button"
        onClick={event => {
          event.preventDefault()
          close()
        }}
      >
        &times;
      </button>
      <div>{children}</div>
    </div>
  </>
)

export default Overlay

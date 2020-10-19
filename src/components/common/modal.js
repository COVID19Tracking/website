import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import modalStyles from './modal.module.scss'

const Modal = ({ children, isOpen, onClose }) => (
  <DialogOverlay className={modalStyles.overlay} isOpen={isOpen}>
    <DialogContent className={modalStyles.content}>
      <button
        type="button"
        className={modalStyles.close}
        onClick={event => {
          event.preventDefault()
          onClose()
        }}
        aria-label="Close"
      >
        &times;
      </button>
      {children}
    </DialogContent>
  </DialogOverlay>
)

export default Modal

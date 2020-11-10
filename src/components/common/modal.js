import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import modalStyles from './modal.module.scss'

const Modal = ({ children, label, isOpen, onClose }) => (
  <DialogOverlay
    className={modalStyles.overlay}
    isOpen={isOpen}
    onDismiss={onClose}
  >
    <DialogContent aria-label={label} className={modalStyles.content}>
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

import React, { useState } from 'react'
import classnames from 'classnames'
import disclaimerStyle from './disclaimer.module.scss'

const Disclaimer = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        aria-expanded={isOpen}
        type="button"
        className={disclaimerStyle.button}
        onClick={event => {
          event.preventDefault()
          setIsOpen(!isOpen)
        }}
      >
        About this data<span aria-hidden> {isOpen ? <>↑</> : <>↓</>}</span>
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className={classnames(
          disclaimerStyle.disclaimer,
          isOpen && disclaimerStyle.isOpen,
        )}
      />
    </div>
  )
}

export default Disclaimer

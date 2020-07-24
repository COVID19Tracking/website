import React from 'react'
import classnames from 'classnames'
import TabletDisclosureStyles from './tablet-disclosure.module.scss'

const TabletDisclosure = ({ children, className }) => (
  <div className={classnames(className)}>
    <div className={TabletDisclosureStyles.container}>{children}</div>
  </div>
)

const TabletDisclosureHeader = ({ isOpen, setIsOpen, children, className }) => (
  <button
    className={classnames(className, TabletDisclosureStyles.header)}
    onClick={() => setIsOpen(!isOpen)} // toggle
    type="button"
    aria-expanded={isOpen}
  >
    {children}
    <div className={TabletDisclosureStyles.caret} aria-expanded={isOpen}>
      <svg
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M0.146447 4.81307C-0.0488155 5.00833 -0.0488155 5.32492 0.146447 5.52018C0.341709 5.71544 0.658291 5.71544 0.853553 5.52018L0.146447 4.81307ZM4 1.66663L4.35355 1.31307L4 0.959519L3.64645 1.31307L4 1.66663ZM7.14645 5.52018C7.34171 5.71544 7.65829 5.71544 7.85355 5.52018C8.04882 5.32492 8.04882 5.00833 7.85355 4.81307L7.14645 5.52018ZM0.853553 5.52018L4.35355 2.02018L3.64645 1.31307L0.146447 4.81307L0.853553 5.52018ZM3.64645 2.02018L7.14645 5.52018L7.85355 4.81307L4.35355 1.31307L3.64645 2.02018Z" />
      </svg>
      <span className="a11y-only">hide/show categories</span>
    </div>
  </button>
)

const TabletDisclosureContent = ({ isOpen, className, children }) => (
  <div
    className={classnames(
      className && className,
      isOpen && TabletDisclosureStyles.opened,
      TabletDisclosureStyles.content,
    )}
  >
    {children}
  </div>
)

export { TabletDisclosure, TabletDisclosureHeader, TabletDisclosureContent }

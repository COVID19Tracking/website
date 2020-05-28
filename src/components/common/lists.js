import React from 'react'
import listsStyles from '~components/common/lists.module.scss'

const OrderedList = ({ children }) => <ol>{children}</ol>

const UnstyledList = ({ children }) => (
  <ul className={`list-unstyled ${listsStyles.listUnstyled}`}>{children}</ul>
)

export { OrderedList, UnstyledList }

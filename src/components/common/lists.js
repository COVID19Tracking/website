import React from 'react'
import listsStyles from '../../scss/components/common/lists.module.scss'

const UnorderedList = ({ children }) => <ul>{children}</ul>

const OrderedList = ({ children }) => <ol>{children}</ol>

const UnstyledList = ({ children }) => (
  <ul className={`list-unstyled ${listsStyles.listUnstyled}`}>{children}</ul>
)

export { UnorderedList, OrderedList, UnstyledList }

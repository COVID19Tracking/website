import React from 'react'
import '../../scss/components/common/lists.scss'

const UnorderedList = ({ children }) => <ul>{children}</ul>

const OrderedList = ({ children }) => <ol>{children}</ol>

const UnstyledList = ({ children }) => (
  <ul className="list-unstyled">{children}</ul>
)

export { UnorderedList, OrderedList, UnstyledList }

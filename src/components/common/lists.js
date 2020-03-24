import React from 'react'

const UnorderedList = ({ children }) => <ul>{children}</ul>

const OrderedList = ({ children }) => <ol>{children}</ol>

const UnstyledList = ({ children }) => <ul className="unstyled">{children}</ul>

export { UnorderedList, OrderedList, UnstyledList }

import React from 'react'

export default ({ children }) => {
  if (typeof children === 'string' || children instanceof String) {
    return <>{children.replace(/\s\s+/g, ' ')}</>
  }
  return children
}

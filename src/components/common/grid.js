import React from 'react'
import classnames from 'classnames'
import gridStyles from './grid.module.scss'
console.log(gridStyles)
export const Row = ({ children }) => (
  <div className={gridStyles.row}>{children}</div>
)

export const Col = ({ children, width, paddingLeft, paddingRight }) => {
  const classes = [gridStyles.col]
  classes.push(gridStyles[`col-small-${width[0]}`])
  classes.push(gridStyles[`col-medium-${width[1]}`])
  classes.push(gridStyles[`col-large-${width[2]}`])
  if (paddingLeft) {
    console.log(`padding-left-small-${paddingLeft[0]}`)
    classes.push(gridStyles[`padding-left-small-${paddingLeft[0]}`])
    classes.push(gridStyles[`padding-left-medium-${paddingLeft[1]}`])
    classes.push(gridStyles[`padding-left-large-${paddingLeft[2]}`])
  }
  if (paddingRight) {
    classes.push(gridStyles[`padding-right-small-${paddingRight[0]}`])
    classes.push(gridStyles[`padding-right-medium-${paddingRight[1]}`])
    classes.push(gridStyles[`padding-right-large-${paddingRight[2]}`])
  }
  return <div className={classnames(classes)}>{children}</div>
}

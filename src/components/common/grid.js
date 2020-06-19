import React from 'react'
import classnames from 'classnames'
import gridStyles from './grid.module.scss'

export const Row = ({ children, className }) => (
  <div className={classnames(gridStyles.row, className)}>{children}</div>
)

export const Col = ({ children, width, paddingLeft, paddingRight }) => {
  const classes = [gridStyles.col]
  classes.push(gridStyles[`colSmall${width[0]}`])
  classes.push(gridStyles[`colMedium${width[1]}`])
  classes.push(gridStyles[`colLarge${width[2]}`])
  if (paddingLeft) {
    classes.push(gridStyles[`paddingLeftSmall${paddingLeft[0]}`])
    classes.push(gridStyles[`paddingLeftMedium${paddingLeft[1]}`])
    classes.push(gridStyles[`paddingLeftLarge${paddingLeft[2]}`])
  }
  if (paddingRight) {
    classes.push(gridStyles[`paddingRightSmall${paddingRight[0]}`])
    classes.push(gridStyles[`paddingRightMedium${paddingRight[1]}`])
    classes.push(gridStyles[`paddingRightLarge${paddingRight[2]}`])
  }
  return <div className={classnames(classes)}>{children}</div>
}

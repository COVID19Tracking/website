import React from 'react'
import classnames from 'classnames'
import gridStyles from './grid.module.scss'

export const Row = ({ children, className }) => (
  <div className={classnames(gridStyles.row, className)}>{children}</div>
)

export const Col = props => {
  const { children, width } = props
  const classes = [gridStyles.col]
  const sides = ['Top', 'Right', 'Bottom', 'Left']
  classes.push(gridStyles[`colSmall${width[0]}`])
  classes.push(gridStyles[`colMedium${width[1]}`])
  classes.push(gridStyles[`colLarge${width[2]}`])
  sides.forEach(side => {
    if (typeof props[`padding${side}`] !== 'undefined') {
      classes.push(
        gridStyles[`padding${side}Small${props[`padding${side}`][0]}`],
      )
      classes.push(
        gridStyles[`padding${side}Medium${props[`padding${side}`][1]}`],
      )
      classes.push(
        gridStyles[`padding${side}Large${props[`padding${side}`][2]}`],
      )
    }
  })

  return <div className={classnames(classes)}>{children}</div>
}

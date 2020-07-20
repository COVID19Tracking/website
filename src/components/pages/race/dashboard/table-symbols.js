/* eslint-disable react/button-has-type */
import React from 'react'
import classnames from 'classnames'
import Tooltip from '@reach/tooltip'
import disparityIcon from '~images/disparity-icon.svg'
import tableSymbolsStyles from './table-symbols.module.scss'

const Notes = ({ index, title, linkTo }) => {
  if (!linkTo || !title) {
    return null
  }
  return (
    <Tooltip label={title} className={tableSymbolsStyles.tooltip}>
      <span className={tableSymbolsStyles.note}>
        <a href={`#${linkTo}`}>
          <span className="a11y-only">{title}</span>
          <span>{index}</span>
        </a>
      </span>
    </Tooltip>
  )
}

const UnlinkedNote = ({ index }) => (
  <span
    aria-hidden
    className={classnames(tableSymbolsStyles.note, tableSymbolsStyles.unlinked)}
  >
    <span>{index}</span>
  </span>
)

const DisparitySymbol = () => (
  <span className={tableSymbolsStyles.disparitySymbol}>
    <Tooltip
      label="Racial/ethnic disparity likely."
      className={tableSymbolsStyles.tooltip}
    >
      <img src={disparityIcon} alt="Racial/ethnic disparity likely." />
    </Tooltip>
  </span>
)

export { Notes, UnlinkedNote, DisparitySymbol }

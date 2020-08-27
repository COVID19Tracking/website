/* eslint-disable react/button-has-type */
import React from 'react'
import classnames from 'classnames'
import Tooltip from '~components/common/tooltip'
import disparityIcon from '~images/race-dashboard/disparity-icon.svg'
import tooltipDisparityIcon from '~images/race-dashboard/tooltip-disparity-icon.svg'
import tableSymbolsStyles from './table-symbols.module.scss'

const TooltipContent = ({ title, index }) => (
  <ol start={index} className={tableSymbolsStyles.tooltipList}>
    <li>{title}</li>
  </ol>
)

const Notes = ({ index, title, linkTo }) => {
  if (!linkTo || !title) {
    return null
  }
  return (
    <Tooltip label={<TooltipContent title={title} index={index} />}>
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

const DisparitySymbol = ({ linkTo }) => (
  <span className={tableSymbolsStyles.disparitySymbol}>
    <Tooltip
      label={
        <>
          <img src={tooltipDisparityIcon} alt="" /> Racial/ethnic disparity
          likely.
        </>
      }
    >
      <a href={`#${linkTo}`}>
        <img src={disparityIcon} alt="Racial/ethnic disparity likely." />
      </a>
    </Tooltip>
  </span>
)

export { Notes, UnlinkedNote, DisparitySymbol, TooltipContent }

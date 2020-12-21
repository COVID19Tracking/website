import React, { useState } from 'react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import classnames from 'classnames'
import Sidebar from './sidebar'
import Disclaimer from '../../components/disclaimer'
import { US } from './states'
import gridStyle from './grid.module.scss'

const Grid = ({ states, us, relatedPost, metric, disclaimer = false }) => {
  const [activeState, setActiveState] = useState(false)
  const [showUs, setShowUs] = useState(false)
  return (
    <div className={gridStyle.wrapper} aria-hidden>
      <svg
        className={gridStyle.us}
        viewBox="0 0 150 160"
        tabIndex="0"
        aria-hidden
      >
        <US
          r={50 * 1.5}
          value={us.value}
          className={value => metric.getColor(value)}
          onClick={() => {
            setShowUs(true)
            setActiveState(false)
          }}
          inGrid
        />
      </svg>
      <ul className={gridStyle.grid}>
        {states.map(state => (
          <li key={`grid-${state.state}`}>
            <button
              type="button"
              className={gridStyle.state}
              onClick={event => {
                event.preventDefault()
                setActiveState(state)
              }}
            >
              <span>
                <div className={gridStyle.name}>
                  <abbr title={state.name}>{state.state}</abbr>
                </div>
                <div className={gridStyle.value}>
                  {Math.round(state.value).toLocaleString()}
                </div>
                <div
                  className={classnames(
                    gridStyle.indicator,
                    metric.getColor(state.value),
                  )}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <ul className={gridStyle.legend}>
        {metric.legend.map(item => (
          <li key={`grid-legend-${item.label}`}>
            <div className={classnames(gridStyle.swatch, item.style)} />
            {item.label}
          </li>
        ))}
      </ul>
      {disclaimer && <Disclaimer text={disclaimer.childMarkdownRemark.html} />}
      <DialogOverlay
        className={gridStyle.overlay}
        isOpen={(activeState || showUs) && true}
        onDismiss={() => {
          setActiveState(false)
          setShowUs(false)
        }}
      >
        <DialogContent className={gridStyle.modal}>
          <button
            className={gridStyle.modalClose}
            type="button"
            aria-label="close"
            onClick={event => {
              event.preventDefault()
              setActiveState(false)
            }}
          >
            &times;
          </button>
          <Sidebar
            state={showUs ? false : { state: activeState }}
            relatedPost={relatedPost}
            inModal
          />
        </DialogContent>
      </DialogOverlay>
    </div>
  )
}

export default Grid

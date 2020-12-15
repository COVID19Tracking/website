import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import classnames from 'classnames'
import Sidebar from './sidebar'
import { US } from './states'
import gridStyle from './grid.module.scss'

const Grid = ({ states, us, relatedPost, metric }) => {
  const [activeState, setActiveState] = useState(false)
  return (
    <div className={gridStyle.wrapper}>
      <svg
        className={gridStyle.us}
        viewBox="0 0 150 150"
        tabIndex="0"
        aria-hidden
      >
        <US
          r={50 * 1.5}
          value={us.value}
          className={value => metric.getColor(value)}
          onClick={() => {
            navigate('/data/national')
          }}
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
      <DialogOverlay
        className={gridStyle.overlay}
        isOpen={activeState && true}
        onDismiss={() => {
          setActiveState(false)
        }}
      >
        <DialogContent className={gridStyle.modal}>
          <button
            className={gridStyle.modalClose}
            type="button"
            onClick={event => {
              event.preventDefault()
              setActiveState(false)
            }}
          >
            &times;
          </button>
          <Sidebar
            state={{ state: activeState }}
            us={us.current}
            relatedPost={relatedPost}
            inModal
          />
        </DialogContent>
      </DialogOverlay>
    </div>
  )
}

export default Grid

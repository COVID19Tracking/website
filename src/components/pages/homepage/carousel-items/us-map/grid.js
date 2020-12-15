import React from 'react'
import { navigate, Link } from 'gatsby'
import classnames from 'classnames'
import { US } from './states'
import gridStyle from './grid.module.scss'

const Grid = ({ states, us, metric }) => {
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
            <Link
              className={gridStyle.state}
              to={`/data/state/${state.childSlug.slug}`}
            >
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
            </Link>
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
    </div>
  )
}

export default Grid

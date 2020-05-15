import React from 'react'
import classnames from 'classnames'
import DetailText from './detail-text'
import tableStyle from './table.module.scss'

const Th = ({
  children,
  colSpan,
  header,
  isFirst,
  alignLeft,
  columnWidth,
  additionalClass,
  wide,
  sortDirection,
  sortable,
  onClick,
}) => {
  const thClasses = []
  if (alignLeft) {
    thClasses.push(tableStyle.alignLeft)
  }
  if (isFirst) {
    thClasses.push(tableStyle.borderLeft)
  }
  if (wide) {
    thClasses.push(tableStyle.wide)
  }
  if (additionalClass) {
    thClasses.push(additionalClass)
  }

  const role = 'text'

  return (
    <th scope="col" colSpan={colSpan} className={classnames(thClasses)}>
      <span role={role}>
        {sortable ? (
          <button
            type="button"
            className={tableStyle.sortButton}
            onClick={onClick}
          >
            {children}
            {sortDirection === 'up' && (
              <abbr
                className={tableStyle.sort}
                title="Sort up"
                aria-label="Sort up"
              >
                ↑
              </abbr>
            )}
            {sortDirection === 'down' && (
              <abbr
                className={tableStyle.sort}
                title="Sort down"
                aria-label="Sort down"
              >
                ↓
              </abbr>
            )}
          </button>
        ) : (
          <>{children}</>
        )}
        {header && (
          <span
            className={`${
              isFirst ? tableStyle.headerLabel : tableStyle.headerLabelHidden
            }${
              columnWidth &&
              typeof tableStyle[`headerLabel${columnWidth}`] !== 'undefined'
                ? ` ${tableStyle[`headerLabel${columnWidth}`]}`
                : ''
            }`}
          >
            {header}
          </span>
        )}
      </span>
    </th>
  )
}

const Td = ({ children, alignLeft, isFirst, additionalClass }) => {
  const tdClasses = []
  if (alignLeft) {
    tdClasses.push(tableStyle.alignLeft)
  }
  if (isFirst) {
    tdClasses.push(tableStyle.borderLeft)
  }
  if (additionalClass) {
    tdClasses.push(additionalClass)
  }

  return <td className={classnames(tdClasses)}>{children}</td>
}

const Table = ({ children, tableLabel }) => (
  <div>
    <table className={tableStyle.table}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export { Th, Td, Table }

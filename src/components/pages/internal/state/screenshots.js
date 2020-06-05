import React, { Fragment } from 'react'
import { FormatDate } from '~components/utils/format'

export default ({ screenshots, stateInfo }) => (
  <section>
    <h2>Screenshots</h2>
    <h3>Primary</h3>
    <a href={stateInfo.covid19Site}>{stateInfo.covid19Site}</a>
    {screenshots && (
      <ul>
        {screenshots.map(screenshot => (
          <Fragment key={screenshot.url}>
            {!screenshot.secondary && (
              <li>
                <a href={screenshot.url} target="_blank" rel="noreferrer">
                  <FormatDate date={screenshot.dateChecked} format="h:mm a" />
                </a>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    )}
    <h3>Secondary</h3>
    <a href={stateInfo.covid19SiteSecondary}>
      {stateInfo.covid19SiteSecondary}
    </a>
    {screenshots && (
      <ul>
        {screenshots.map(screenshot => (
          <Fragment key={screenshot.url}>
            {screenshot.secondary && (
              <li>
                <a href={screenshot.url} target="_blank" rel="noreferrer">
                  <FormatDate date={screenshot.dateChecked} format="h:mm a" />
                </a>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    )}
  </section>
)

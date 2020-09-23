import React from 'react'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import { FormatNumber } from '~components/utils/format'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'

import SocialCardFootnotes from './footnotes'
import SocialCardHeader from './header'
import NoDataSocialCard from './no-data'
import { getStateStatus, getGroups } from './utils'

import socialCardStyle from './social-card.module.scss'

const StateRaceSocialCard = renderedComponent(
  ({ state, combinedStates, square = false }) => {
    // gets the width of the bar for the bar charts

    const getWidthPercentage = (number, max) =>
      number / max > 0.1 ? (number / max) * 100 : 2

    const groupValues = getGroups(state)
    const { groups } = groupValues

    const stateStatus = getStateStatus(state, combinedStates)

    if (stateStatus.deathsOnly) {
      groups.sort((a, b) => {
        // sort bars by # of deaths
        if (a.deaths >= b.deaths) {
          return -1
        }
        return 1
      })
    }

    if (stateStatus.noCharts) {
      return <NoDataSocialCard stateName={state.name} />
    }

    return (
      <div
        className={classnames(
          socialCardStyle.container,
          square && socialCardStyle.square,
        )}
      >
        <div
          className={classnames(
            socialCardStyle.grid,
            stateStatus.casesOnly && socialCardStyle.casesOnly,
            stateStatus.deathsOnly && socialCardStyle.deathsOnly,
          )}
        >
          {!square && <span />}
          {/*
            adds a spacer element to the grid, since the non-square
            header spans two columns, not all three
          */}
          <p className={socialCardStyle.header}>
            <SocialCardHeader state={state} />
          </p>
          <span /> {/* spacer for css grid */}
          {!stateStatus.deathsOnly && (
            <span
              className={classnames(
                socialCardStyle.casesHeader,
                socialCardStyle.barHeader,
              )}
            >
              Cases per 100,000 people
            </span>
          )}
          {!stateStatus.casesOnly && (
            <span
              className={classnames(
                socialCardStyle.deathsHeader,
                socialCardStyle.barHeader,
              )}
            >
              Deaths per 100,000 people
            </span>
          )}
          {/* justCases/justDeaths applies to each row, onlyCases/onlyDeaths
          applies to the whole state. i.e. if onlyCases is true, there will be
          only one chart for the state. If justCases is true, a single value
          will not be shown */}
          {groups.map(
            ({ label, style, cases, deaths, justCases, justDeaths }) => (
              <>
                <span className={socialCardStyle.barLabel}>{label}</span>
                {!stateStatus.deathsOnly && (
                  <>
                    {justDeaths ? (
                      <span className={socialCardStyle.insufficientData}>
                        No data reported
                      </span>
                    ) : (
                      <div className={socialCardStyle.barContainer}>
                        <div
                          className={classnames(socialCardStyle.bar, style)}
                          style={{
                            width: `${getWidthPercentage(
                              cases,
                              groupValues.worstCasesValue,
                            )}%`,
                          }}
                        >
                          {getWidthPercentage(
                            cases,
                            groupValues.worstCasesValue,
                          ) > 50 && (
                            <span>
                              <FormatNumber number={cases} />
                            </span>
                          )}
                        </div>
                        {getWidthPercentage(
                          cases,
                          groupValues.worstCasesValue,
                        ) < 50 && (
                          <span>
                            <FormatNumber number={cases} />
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
                {!stateStatus.casesOnly && (
                  <>
                    {justCases ? (
                      <span
                        className={classnames(
                          socialCardStyle.insufficientData,
                          socialCardStyle.insufficientDataDeaths,
                        )}
                      >
                        No data reported
                      </span>
                    ) : (
                      <div className={socialCardStyle.barContainer}>
                        <div
                          className={classnames(
                            socialCardStyle.bar,
                            socialCardStyle.deathBar,
                            style,
                          )}
                          style={{
                            width: `${getWidthPercentage(
                              deaths,
                              groupValues.worstDeathsValue,
                            )}%`,
                          }}
                        >
                          {getWidthPercentage(
                            deaths,
                            groupValues.worstDeathsValue,
                          ) > 50 && (
                            <span>
                              <FormatNumber number={deaths} />
                            </span>
                          )}
                        </div>
                        {getWidthPercentage(
                          deaths,
                          groupValues.worstDeathsValue,
                        ) < 50 && (
                          <span>
                            <FormatNumber number={deaths} />
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            ),
          )}
        </div>
        <SocialCardFootnotes state={state} stateName={state.name} />

        <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
        <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
      </div>
    )
  },
)

export default StateRaceSocialCard

export { SocialCardHeader }

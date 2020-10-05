import React from 'react'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import { FormatNumber } from '~components/utils/format'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'

import SocialCardFootnotes from './footnotes'
import SocialCardHeader from './header'
import NoDataSocialCard from './no-data'
import { getStateStatus, getGroups, getBarWidth } from './utils'

import socialCardStyle from './social-card.module.scss'

const StateRaceSocialCard = renderedComponent(
  ({
    state,
    combinedStates,
    square = false,
    statesReportingCases,
    statesReportingDeaths,
  }) => {
    // gets the width of the bar for the bar charts

    const getWidthPercentage = (number, max) => (number / max) * 100

    const groupValues = getGroups(state)
    const { groups } = groupValues

    let showAsteriskFootnote = false

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
      return <NoDataSocialCard stateName={state.name} square={square} />
    }

    const nullValue = 'No data reported'

    // if any of the smallNDeaths values is true
    groups.forEach(group => {
      if (group.smallNDeaths) {
        showAsteriskFootnote = true // set showAsteriskFootnote to true
      }
    })

    return (
      <div
        className={classnames(
          socialCardStyle.wrapper,
          square && socialCardStyle.square,
        )}
      >
        <p className={socialCardStyle.header}>
          <SocialCardHeader state={state} combinedStates={combinedStates} />
        </p>
        <div
          className={classnames(
            socialCardStyle.grid,
            stateStatus.casesOnly && socialCardStyle.casesOnly,
            stateStatus.deathsOnly && socialCardStyle.deathsOnly,
          )}
        >
          <span />
          <span />
          <span />
          <span />
          {stateStatus.oneChart && <span />}
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
          {groups.map(({ label, style, cases, deaths, smallNDeaths }) => (
            <>
              <span className={socialCardStyle.barLabel}>{label}</span>
              {!stateStatus.deathsOnly && (
                <>
                  {cases === null ? (
                    <span className={socialCardStyle.insufficientData}>
                      {nullValue}
                    </span>
                  ) : (
                    <div className={socialCardStyle.barContainer}>
                      <div
                        className={classnames(
                          socialCardStyle.bar,
                          style,
                          getWidthPercentage(
                            cases,
                            groupValues.worstCasesValue,
                          ) !== 0 && socialCardStyle.hasInnerLabel,
                        )}
                        style={{
                          width: `${getBarWidth(
                            cases,
                            groupValues.worstCasesValue,
                            square,
                            stateStatus.oneChart,
                          )}px`,
                        }}
                      >
                        {getWidthPercentage(
                          cases,
                          groupValues.worstCasesValue,
                        ) > 50 && <BarContent value={cases} />}
                      </div>
                      {getWidthPercentage(cases, groupValues.worstCasesValue) <=
                        50 && <BarContent value={cases} />}
                    </div>
                  )}
                </>
              )}
              {!stateStatus.casesOnly && (
                <>
                  {deaths === null ? (
                    <span
                      className={classnames(
                        socialCardStyle.insufficientData,
                        socialCardStyle.insufficientDataDeaths,
                      )}
                    >
                      {nullValue}
                    </span>
                  ) : (
                    <div className={socialCardStyle.barContainer}>
                      <div className={socialCardStyle.deathBarSpacer} />
                      <div
                        className={classnames(
                          socialCardStyle.bar,
                          style,
                          getWidthPercentage(
                            deaths,
                            groupValues.worstDeathsValue,
                          ) !== 0 && socialCardStyle.hasInnerLabel,
                        )}
                        style={{
                          width: `${getBarWidth(
                            deaths,
                            groupValues.worstDeathsValue,
                            square,
                            stateStatus.oneChart,
                          )}px`,
                        }}
                      >
                        {getWidthPercentage(
                          deaths,
                          groupValues.worstDeathsValue,
                        ) > 50 && (
                          <BarContent
                            value={deaths}
                            smallNDeaths={smallNDeaths}
                          />
                        )}
                      </div>
                      {getWidthPercentage(
                        deaths,
                        groupValues.worstDeathsValue,
                      ) < 50 && (
                        <BarContent
                          value={deaths}
                          smallNDeaths={smallNDeaths}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ))}
        </div>

        <div className={socialCardStyle.footer}>
          <SocialCardFootnotes
            state={state}
            stateName={state.name}
            statesReportingCases={statesReportingCases}
            statesReportingDeaths={statesReportingDeaths}
            showAsteriskFootnote={showAsteriskFootnote}
          />
          <div className={socialCardStyle.logosContainer}>
            <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
            <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
          </div>
        </div>
      </div>
    )
  },
)

const BarContent = ({ value, smallNDeaths = false }) => (
  <span>
    <FormatNumber number={value} />
    {smallNDeaths && '*'}
  </span>
)

export default StateRaceSocialCard

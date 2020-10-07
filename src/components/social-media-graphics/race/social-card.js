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
    const stateStatus = getStateStatus(state, combinedStates)

    // handle empty state
    if (stateStatus.noCharts) {
      return <NoDataSocialCard stateName={state.name} square={square} />
    }

    // sort groups by deaths if only deaths are reported
    // (this is sorted by cases in utils.js by default)
    if (stateStatus.deathsOnly) {
      groups.sort((a, b) => {
        // sort bars by # of deaths
        if (a.deaths >= b.deaths) {
          return -1
        }
        return 1
      })
    }

    const nullValue = 'No data reported' // the value to show for the empty state

    let showSmallNFootnote = false
    let asteriskFootnote = null

    // if any of the showAsterisk values is true
    groups.forEach(group => {
      if (group.showAsterisk) {
        showSmallNFootnote = true // set showSmallNFootnote to true
      }
    })

    // special case to add an asterisk for Montana AIAN
    if (state.name == 'Montana') {
      groups.forEach((group, index) => {
        if (group.label == 'American Indian/Alaska Native') {
          groups[index].showCross = true
        }
      })
      asteriskFootnote =
        'Montana includes Native Hawaiians and Other Pacific Islanders in this category.'
    }

    // special case to add an asterisk for New Mexico API
    if (state.name == 'New Mexico') {
      groups.forEach((group, index) => {
        if (group.label == 'Asian/Pacific Islander') {
          groups[index].showCross = true
        }
      })
      asteriskFootnote =
        'New Mexico defines this category as Asian alone for case data, and Asian/Pacific Islander for death data.'
    }

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
          {groups.map(
            ({ label, style, cases, deaths, showAsterisk, showCross }) => (
              <>
                <span className={socialCardStyle.barLabel}>
                  {label}
                  {showCross && '†'}
                </span>
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
                        {getWidthPercentage(
                          cases,
                          groupValues.worstCasesValue,
                        ) <= 50 && <BarContent value={cases} />}
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
                              showAsterisk={showAsterisk}
                            />
                          )}
                        </div>
                        {getWidthPercentage(
                          deaths,
                          groupValues.worstDeathsValue,
                        ) <= 50 && (
                          <BarContent
                            value={deaths}
                            showAsterisk={showAsterisk}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            ),
          )}
        </div>

        <div className={socialCardStyle.footer}>
          <SocialCardFootnotes
            state={state}
            stateName={state.name}
            statesReportingCases={statesReportingCases}
            statesReportingDeaths={statesReportingDeaths}
            showSmallNFootnote={showSmallNFootnote}
            asteriskFootnote={asteriskFootnote}
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

const BarContent = ({ value, showAsterisk = false }) => (
  <span>
    <FormatNumber number={value} />
    {showAsterisk && '*'}
  </span>
)

export default StateRaceSocialCard

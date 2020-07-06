import React, { useState, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import { DateTime } from 'luxon'
import Container from '~components/common/container'
import BarChart from '~components/charts/bar-chart'
import { parseDate } from '~utilities/visualization'
import { Row, Col } from '~components/common/grid'
import Toggle from '~components/common/toggle'
import ContentfulContent from '~components/common/contentful-content'
import { AlertInfobox } from '~components/common/infobox'

import { ReactComponent as CtpLogo } from '~images/project-logo.svg'
import colors from '~scss/colors.module.scss'

import styles from './summary-charts.module.scss'

const dailyAverage = (history, field, range = 7) => {
  if (!history || !field) return null
  const average = []
  history.forEach((row, rowIndex) => {
    const pastRows = []
    let pastIndex = rowIndex
    while (pastIndex >= 0 && pastIndex > rowIndex - range) {
      pastRows.push(history[pastIndex][field])
      pastIndex -= 1
    }
    average.push({
      date: parseDate(row.date),
      value: pastRows.reduce((a, b) => a + b, 0) / pastRows.length,
    })
  })
  return average
}

// must be of format:
//  {
//   date: Date
//   value: number
// }
const getDataForField = (data, field) => {
  return data.map(d => ({
    date: parseDate(d.date),
    value: d[field],
  }))
}

const ChartAlert = ({ message }) => (
  <div className={styles.alertInfoboxContainer}>
    <AlertInfobox header={message} fullSize />
  </div>
)

const AnnotationIndicator = ({ annotations, dataElement, openDisclosure }) => {
  if (
    !annotations ||
    !annotations.nodes ||
    !annotations.nodes.filter(
      annotation => annotation.dataElement === dataElement,
    ).length
  ) {
    return null
  }
  return (
    <a
      href="#chart-annotations"
      id="chart-annotations"
      className={styles.annotationIndicator}
      onClick={() => openDisclosure()}
    >
      Notes
    </a>
  )
}

export default ({ name = 'National', history, usHistory, annotations }) => {
  const siteData = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          stateChartDateRange
          stateChartPerCapMeasure
        }
      }
      contentfulSnippet(slug: { eq: "data-chart-disclaimer" }) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const {
    stateChartDateRange,
    stateChartPerCapMeasure,
  } = siteData.site.siteMetadata

  const { contentfulSnippet } = siteData

  const [usePerCap, setUsePerCap] = useState(false)
  const [isDisclosureOpen, setDisclosureOpen] = useState(false)

  // This enables us to use the getDataForField & dailyAverage functions above
  // without enable triple nested properties
  const hoistPerCapProps = node => {
    const obj = {}
    Object.keys(node.childPopulation).forEach(t => {
      obj[`perCap_${t}`] =
        node.childPopulation[t].percent * stateChartPerCapMeasure
    })
    return { ...node, ...obj }
  }

  // Used for testing older sections of data
  const sliceIndex = 0

  const data = [...history]
    .slice(sliceIndex, stateChartDateRange)
    .sort((a, b) => a.date - b.date)
    .map(hoistPerCapProps)

  // Could be made more efficent by memoizing the sliced, sorted & mapped
  // result and then returning that or null but this doesn't seem necessary
  // for now.
  const usData = useMemo(
    () =>
      usHistory &&
      usePerCap &&
      [...usHistory]
        .slice(sliceIndex, stateChartDateRange)
        .sort((a, b) => a.date - b.date)
        .map(hoistPerCapProps),

    [usHistory, usePerCap],
  )

  const hasData = field =>
    data.filter(item => item[field.replace('perCap_', '')] !== null).length >=
      data.length * 0.3 &&
    data.filter(item => item[field.replace('perCap_', '')] > 0).length > 0

  // Below enables the charts to switch between the per cap & not data
  // using the toggle state
  const prepend = useMemo(() => (usePerCap ? 'perCap_' : ''), [usePerCap])
  const testField = useMemo(() => `${prepend}totalTestResultsIncrease`, [
    prepend,
  ])
  const positiveField = useMemo(() => `${prepend}positiveIncrease`, [prepend])
  const hospitalizedField = useMemo(() => `${prepend}hospitalizedCurrently`, [
    prepend,
  ])
  const deathField = useMemo(() => `${prepend}deathIncrease`, [prepend])

  const props = {
    height: 280, // these control the dimensions used to render the svg but not the final size
    width: 280, // that is determined by the containing element
    marginBottom: 40,
    marginLeft: 60,
    marginRight: 30,
    marginTop: 10,
    xTicks: 3,
    showTicks: 6,
  }

  // 1 chart per line on small, 2 on medium & 4 on large sreens
  const colWidth = [4, 3, 3]

  const getAlertMessage = (field, current = false) =>
    `${name} has not reported data on  ${
      current ? 'current' : ''
    }  COVID-19 ${field} for at least 30% of the past 90 days.`

  const showTodaysChartTick =
    DateTime.fromISO(data[data.length - 1].date).day > 10
  return (
    <>
      <h2>{name} overview</h2>
      <div className={styles.infoLine}>
        <div className={styles.toggleContainer}>
          {usHistory && (
            <Toggle
              options={['Totals', 'Per 1M people']}
              state={usePerCap}
              setState={setUsePerCap}
            />
          )}
        </div>
        {usData && usePerCap && <LegendComponent />}
        <LegendComponent name={name || 'National'} />
      </div>
      <Row>
        <Col width={colWidth}>
          <h5>
            New tests{' '}
            <AnnotationIndicator
              annotations={annotations}
              dataElement="tests"
              openDisclosure={() => setDisclosureOpen(true)}
            />
          </h5>
          <BarChart
            data={getDataForField(data, testField)}
            lineData={dailyAverage(data, testField)}
            refLineData={dailyAverage(usData, testField)}
            fill={colors.colorPlum200}
            lineColor={colors.colorPlum700}
            lastXTick={showTodaysChartTick}
            {...props}
          />
        </Col>
        <Col width={colWidth}>
          <h5>
            New cases{' '}
            <AnnotationIndicator
              annotations={annotations}
              dataElement="cases"
              openDisclosure={() => setDisclosureOpen(true)}
            />
          </h5>
          {hasData(positiveField) ? (
            <BarChart
              data={getDataForField(data, positiveField)}
              lineData={dailyAverage(data, positiveField)}
              refLineData={dailyAverage(usData, positiveField)}
              fill={colors.colorStrawberry100}
              lineColor={colors.colorStrawberry200}
              lastXTick={showTodaysChartTick}
              {...props}
            />
          ) : (
            <ChartAlert message={getAlertMessage('cases')} />
          )}
        </Col>
        <Col width={colWidth}>
          <h5>
            Current hospitalizations{' '}
            <AnnotationIndicator
              annotations={annotations}
              dataElement="hospitalizations"
              openDisclosure={() => setDisclosureOpen(true)}
            />
          </h5>

          {hasData(hospitalizedField) ? (
            <BarChart
              data={getDataForField(data, hospitalizedField)}
              lineData={dailyAverage(data, hospitalizedField)}
              refLineData={dailyAverage(usData, hospitalizedField)}
              fill={colors.colorBlueberry200}
              lineColor={colors.colorBlueberry400}
              lastXTick={showTodaysChartTick}
              {...props}
            />
          ) : (
            <ChartAlert message={getAlertMessage('hospitalizations', true)} />
          )}
        </Col>
        <Col width={colWidth}>
          <h5>
            New deaths{' '}
            <AnnotationIndicator
              annotations={annotations}
              dataElement="death"
              openDisclosure={() => setDisclosureOpen(true)}
            />
          </h5>
          {hasData(deathField) ? (
            <BarChart
              data={getDataForField(data, deathField)}
              lineData={dailyAverage(data, deathField)}
              refLineData={dailyAverage(usData, deathField)}
              fill={colors.colorSlate300}
              lineColor={colors.colorSlate700}
              lastXTick={showTodaysChartTick}
              {...props}
            />
          ) : (
            <ChartAlert message={getAlertMessage('deaths')} />
          )}
        </Col>
      </Row>
      <Row>
        <Col width={[4, 6, 10]}>
          <Disclosure
            open={isDisclosureOpen}
            onChange={() => setDisclosureOpen(!isDisclosureOpen)}
          >
            <DisclosureButton
              id="chart-annotations"
              className={styles.disclosure}
            >
              Chart information and data{' '}
              <span className={styles.arrowDown} aria-hidden>
                ↓
              </span>
              <span className={styles.arrowUp} aria-hidden>
                ↑
              </span>
            </DisclosureButton>
            <DisclosurePanel>
              <Container narrow>
                {annotations && annotations.nodes && (
                  <>
                    {annotations.nodes.map(annotation => (
                      <>
                        <h3 className={styles.annotationTitle}>
                          {annotation.title}
                        </h3>
                        <ContentfulContent
                          content={
                            annotation.childContentfulEventDescriptionTextNode
                              .childMarkdownRemark.html
                          }
                          id={annotation.contentful_id}
                        />
                      </>
                    ))}
                    <hr />
                  </>
                )}

                <ContentfulContent
                  content={
                    contentfulSnippet.childContentfulSnippetContentTextNode
                      .childMarkdownRemark.html
                  }
                  id={contentfulSnippet.contentful_id}
                />
              </Container>
            </DisclosurePanel>
          </Disclosure>
        </Col>
        <Col width={[4, 6, 2]}>
          <CtpLogo className={styles.chartLogo} />
        </Col>
      </Row>
    </>
  )
}

const LegendComponent = ({ name }) => (
  <div className={styles.legendComponent}>
    <svg height="4" width="50">
      <line
        x1="0"
        y1="3"
        x2="45"
        y2="3"
        stroke="black"
        strokeWidth="2"
        strokeDasharray={!name && '4'}
      />
    </svg>
    {name || 'National'} 7-day average
  </div>
)

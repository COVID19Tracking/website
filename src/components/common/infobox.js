import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FormatDate } from '~components/utils/format'
import infoBoxStyle from './infobox.module.scss'
import syncIcon from '~images/infobox-icons/sync.svg'
import alertIcon from '~images/infobox-icons/alert.svg'
import questionIcon from '~images/infobox-icons/question.svg'
import Timezone from './timezone'

const InfoboxInner = ({ header, children }) => (
  <div>
    <p className={infoBoxStyle.header}>{header}</p>
    <div className={infoBoxStyle.content}>{children}</div>
  </div>
)

const Infobox = ({ header, children }) => (
  <div className={`infobox ${infoBoxStyle.infobox}`}>
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

// Currently the only one using fullSize but this could be added to any/all
const AlertInfobox = ({ header, children, fullSize = false }) => (
  <div
    className={`infobox alert ${infoBoxStyle.infobox} ${
      infoBoxStyle.alert
    } ${fullSize && infoBoxStyle.fullSize}`}
  >
    <img src={alertIcon} alt="Alert icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

const QuestionInfobox = ({ header, children }) => (
  <div
    className={`infobox question ${infoBoxStyle.infobox} ${infoBoxStyle.question}`}
  >
    <img src={questionIcon} alt="Question icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

const SyncInfobox = () => (
  <StaticQuery
    query={graphql`
      query {
        v1Json {
          buildTime
        }
      }
    `}
    render={data => (
      <div
        className={`infobox sync ${infoBoxStyle.infobox} ${infoBoxStyle.sync}`}
      >
        <img src={syncIcon} alt="Sync icon" />
        <div>
          <InfoboxInner header="Last updated from our data:">
            <FormatDate date={data.v1Json.buildTime} format="h:mm a" />{' '}
            <Timezone />
          </InfoboxInner>
        </div>
      </div>
    )}
  />
)

export { Infobox, SyncInfobox, AlertInfobox, QuestionInfobox }

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import infoBoxStyle from '~components/common/infobox.module.scss'
import syncIcon from '~images/infobox-icons/sync.svg'
import alertIcon from '~images/infobox-icons/alert.svg'
import questionIcon from '~images/infobox-icons/question.svg'
import Timezone from '~components/common/timezone'

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

const AlertInfobox = ({ header, children }) => (
  <div
    className={`infobox alert ${infoBoxStyle.infobox} ${infoBoxStyle.alert}`}
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
        site {
          siteMetadata {
            buildDate
          }
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
            {data.site.siteMetadata.buildDate} <Timezone />
          </InfoboxInner>
        </div>
      </div>
    )}
  />
)

export { Infobox, SyncInfobox, AlertInfobox, QuestionInfobox }

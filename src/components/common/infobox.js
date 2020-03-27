import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import '../../scss/components/common/infobox.scss'
import syncIcon from '../../images/infobox-icons/sync.svg'
import alertIcon from '../../images/infobox-icons/alert.svg'
import questionIcon from '../../images/infobox-icons/question.svg'

const InfoboxInner = ({ header, children }) => (
  <div>
    <p className="info-header">{header}</p>
    <div className="info-content">{children}</div>
  </div>
)

const Infobox = ({ header, children }) => (
  <div className="infobox">
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

const AlertInfobox = ({ header, children }) => (
  <div className="infobox infobox-alert">
    <img src={alertIcon} alt="Alert icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

const QuestionInfobox = ({ header, children }) => (
  <div className="infobox infobox-question">
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
      <div className="infobox infobox-sync">
        <img src={syncIcon} alt="Sync icon" />
        <div>
          <InfoboxInner header="Last synced with our spreadsheet:">
            {data.site.siteMetadata.buildDate}
          </InfoboxInner>
        </div>
      </div>
    )}
  />
)

export { Infobox, SyncInfobox, AlertInfobox, QuestionInfobox }

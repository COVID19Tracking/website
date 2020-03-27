import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import '../../scss/components/common/infobox.scss'
import syncIcon from '../../images/infobox-icons/sync.svg'
import alertIcon from '../../images/infobox-icons/alert.svg'

const InfoboxInner = ({ header, content }) => (
  <div>
    <p className="info-header">{header}</p>
    <p className="info-content">{content}</p>
  </div>
)

const Infobox = ({ header, content }) => (
  <div className="infobox">
    <InfoboxInner header={header} content={content} />
  </div>
)

const AlertInfobox = ({ header, content }) => (
  <div className="infobox infobox-alert">
    <img src={alertIcon} alt="Alert icon" />
    <InfoboxInner header={header} content={content} />
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
          <InfoboxInner
            header="Last synced with our spreadsheet:"
            content={data.site.siteMetadata.buildDate}
          />
        </div>
      </div>
    )}
  />
)

export { Infobox, SyncInfobox, AlertInfobox }

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import '../../scss/components/common/infobox.scss'
import syncIcon from '../../images/infobox-icons/sync.svg'

const Infobox = ({ header, content }) => (
  <div className="infobox">
    <p className="info-header">{header}</p>
    <p className="info-content">{content}</p>
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
          <p className="info-header">Last synced with our spreadsheet:</p>
          <p className="info-content">{data.site.siteMetadata.buildDate}</p>
        </div>
      </div>
    )}
  />
)

export { Infobox, SyncInfobox }

import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from '~components/common/grid'

import LastUpdated from '~components/common/last-updated'
import preambleStyle from './preamble.module.scss'
import downloadDataStyles from './download-data.module.scss'

const DownloadData = ({ slug, hideLabel = false }) => (
  <div className={downloadDataStyles.container}>
    {!hideLabel && (
      <h2 className={downloadDataStyles.header}>Get the data as:</h2>
    )}
    <p>
      <a
        href={`/data/download/${slug}-history.csv`}
        className={downloadDataStyles.button}
        aria-label={`Download ${slug} data as CSV`}
      >
        CSV
      </a>
      <Link
        to="/data/api"
        className={downloadDataStyles.button}
        aria-label={`access ${slug} data with our API`}
      >
        API
      </Link>
    </p>
  </div>
)

const DownloadDataRow = ({ slug, lastUpdateEt, national = false }) => (
  <Row>
    <Col width={[4, 6, 6]}>
      <div className={downloadDataStyles.lastUpdatedContainer}>
        <LastUpdated date={lastUpdateEt} national={national} />
      </div>
    </Col>
    <Col width={[4, 6, 6]}>
      <div className={preambleStyle.largeDisclosure}>
        <DownloadData slug={slug} />
      </div>
    </Col>
  </Row>
)

export default DownloadData

export { DownloadData, DownloadDataRow }

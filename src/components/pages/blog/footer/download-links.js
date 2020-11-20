import React from 'react'
import Container from '~components/common/container'
import downloadLinksStyles from './download-links.module.scss'
import downloadDataStyles from '~components/pages/state/download-data.module.scss'

const DownloadLinks = ({ links }) => (
  <Container centered>
    <h4 className={downloadLinksStyles.header}>
      Download this post&apos;s data
    </h4>
    <p>
      {links.map(link => (
        <a href={link.file.url} className={downloadDataStyles.button}>
          {link.title}
        </a>
      ))}
    </p>
  </Container>
)

export default DownloadLinks

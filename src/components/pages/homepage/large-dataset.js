import React from 'react'
import Paragraph from '~components/common/landing-page/paragraph'
import largeDatasetStyles from './large-dataset.module.scss'

const HomepageLargeDataset = () => (
  <div className={largeDatasetStyles.largeDataset}>
    <Paragraph additionalClass={largeDatasetStyles.homepageParagraph}>
      Our data powers crucial reporting and research. Here are just a few of the
      organizations that rely on our dataset.
    </Paragraph>
  </div>
)

export default HomepageLargeDataset

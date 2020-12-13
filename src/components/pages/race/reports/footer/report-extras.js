/*eslint-disable*/

import React from 'react'
import AuthorFooter from '~components/pages/blog/footer/author-footer'
import reportExtrasStyles from './report-extras.module.scss'

const ReportExtras = ({ crdtReport }) => {
  const footerAuthors = crdtReport.authors.filter(
    author => author.childContentfulAuthorBiographyTextNode !== null,
  ) // only keep authors with biographies

  return (
    <>
      {footerAuthors.length > 0 && (
        <>
          <hr className={reportExtrasStyles.divider} />
          <div className={reportExtrasStyles.eightColWrapper}>
            <AuthorFooter authors={footerAuthors} />
          </div>
        </>
      )}
    </>
  )
}

export default ReportExtras

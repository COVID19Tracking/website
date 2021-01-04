import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { FormatNumber } from '~components/utils/format'
import { Row } from '~components/common/grid'
import sidebarStyle from './sidebar.module.scss'

const Number = ({ number, label }) => (
  <div className={sidebarStyle.number}>
    <h3 className="a11y-only">{label}</h3>
    <FormatNumber number={number} />
    <p aria-hidden className={sidebarStyle.label}>
      {label}
    </p>
  </div>
)

const Header = ({ children }) => (
  <h2 className={sidebarStyle.header}>{children}</h2>
)

const RelatedPost = ({ date, title, slug }) => (
  <div className={sidebarStyle.relatedPost}>
    <p className={sidebarStyle.date}>{date}</p>
    <Link to={`/analysis-updates/${slug}`} className={sidebarStyle.title}>
      <p>{title}</p>
    </Link>
    <Link to={`/analysis-updates/${slug}`} className={sidebarStyle.link}>
      Read the article<span aria-hidden>→</span>
      <span className="a11y-only"> {title}</span>
    </Link>
  </div>
)

const RelatedFlex = ({ children }) => (
  <div className={sidebarStyle.relatedFlex}>{children}</div>
)

const NationalTotals = ({ relatedPost }) => {
  const { covidUs } = useStaticQuery(graphql`
    {
      covidUs {
        totalTestResults
        hospitalizedCurrently
        positive
        death
      }
    }
  `)

  return (
    <>
      <h3 className={sidebarStyle.nationalTitle}>
        <Link to="/data">US Total</Link>
      </h3>
      <Row>
        <Number number={covidUs.totalTestResults} label="Total test results" />
        <Number number={covidUs.positive} label="Cases" />
        <Number
          number={covidUs.hospitalizedCurrently}
          label="Currently hospitalized"
        />
        <Number number={covidUs.death} label="Deaths" />
      </Row>
      {relatedPost && (
        <RelatedPost
          title={relatedPost.title}
          slug={relatedPost.slug}
          date={relatedPost.publishDate}
        />
      )}
    </>
  )
}

export default Number

export { Number, Header, RelatedPost, RelatedFlex, NationalTotals }

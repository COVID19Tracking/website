import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { Number, Header, RelatedPost } from '../sidebar'
import sidebarStyle from './sidebar.module.scss'
import { Row } from '~components/common/grid'

const Sidebar = ({ state, us, inModal = false, relatedPost = false }) => (
  <div
    className={classnames(
      sidebarStyle.sidebar,
      inModal && sidebarStyle.inModal,
    )}
  >
    <Header>Latest totals</Header>
    {state ? (
      <>
        <h3 className={sidebarStyle.stateName}>
          <Link to={`/data/state/${state.state.childSlug.slug}`}>
            {state.state.name}
          </Link>
        </h3>
        <Row>
          <Number
            number={state.state.current.totalTestResults}
            label="Total test results"
          />
          <Number number={state.state.current.positive} label="Total cases" />
          <Number
            number={state.state.current.hospitalizedCurrently}
            label="Currently hospitalized"
          />
          <Number number={state.state.current.death} label="Deaths" />
        </Row>
        <Link
          to={`/data/state/${state.state.childSlug.slug}`}
          className={sidebarStyle.link}
        >
          <span className={sidebarStyle.text}>All state data</span>{' '}
          <span aria-hidden>→</span>
        </Link>
      </>
    ) : (
      <>
        <h3 className={sidebarStyle.stateName}>
          <Link to="/data">US Total</Link>
        </h3>
        <Row>
          <Number number={us.totalTestResults} label="Total test results" />
          <Number number={us.positive} label="Cases" />
          <Number number={us.death} label="Deaths" />
        </Row>
        {relatedPost && (
          <RelatedPost
            title={relatedPost.title}
            slug={relatedPost.slug}
            date={relatedPost.publishDate}
          />
        )}
      </>
    )}
  </div>
)

export default Sidebar

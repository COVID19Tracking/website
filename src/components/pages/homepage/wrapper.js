import React from 'react'
import classnames from 'classnames'
import Container from '~components/common/landing-page/container'
import { Row, Col } from '~components/common/grid'
import wrapperStyle from './wrapper.module.scss'

const HomepageWrapper = ({
  children,
  links,
  title,
  noBottomMargin = false,
}) => (
  <div
    className={classnames(
      wrapperStyle.wrapper,
      noBottomMargin && wrapperStyle.noMargin,
    )}
  >
    <Container>
      <Row>
        <Col width={[4, 6, 9]} paddingRight={[0, 0, 16]}>
          <h2>{title}</h2>
          {children}
        </Col>
        <Col
          width={[4, 6, 3]}
          className={wrapperStyle.links}
          paddingLeft={[0, 0, 32]}
        >
          <ul>
            {links.map(link => (
              <li>{link}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  </div>
)

export default HomepageWrapper

import React from 'react'
import classnames from 'classnames'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import wrapperStyle from './wrapper.module.scss'

const HomepageWrapper = ({
  children,
  links,
  title,
  bottomMargin = false,
  topMargin = false,
  blue = false,
}) => (
  <div
    className={classnames(
      wrapperStyle.wrapper,
      bottomMargin && wrapperStyle.bottomMargin,
      topMargin && wrapperStyle.topMargin,
      blue && wrapperStyle.blue,
    )}
  >
    <Container>
      <Row>
        <Col width={[4, 6, 8]} paddingRight={[0, 0, 64]}>
          <h2>{title}</h2>
          {children}
        </Col>
        <Col
          width={[4, 6, 4]}
          className={wrapperStyle.links}
          paddingLeft={[0, 0, 0]}
        >
          <ul>
            {links.map(link => (
              <li>
                {link}
                <span aria-hidden> →</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  </div>
)

export default HomepageWrapper

import React from 'react'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import colorBlockStyle from './color-block.module.scss'

const HomepageWrapper = ({ children, links, title }) => (
  <div className={colorBlockStyle.wrapper}>
    <Container>
      <Row>
        <Col width={[4, 6, 8]} paddingRight={[0, 0, 64]}>
          <h2>{title}</h2>
          {children}
        </Col>
        <Col
          width={[4, 6, 4]}
          className={colorBlockStyle.links}
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

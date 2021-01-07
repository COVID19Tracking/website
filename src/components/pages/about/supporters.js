import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import supportersStyle from './supporters.module.scss'

const Supporters = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulSupporterOrPartner(sort: { fields: order }) {
        nodes {
          name
          logo {
            fixed(width: 500) {
              src
              srcSet
            }
          }
          link
        }
      }
    }
  `)
  const { nodes } = data.allContentfulSupporterOrPartner
  return (
    <Row>
      {nodes.map((partner, index) => (
        <Col
          width={[6, 3, 6]}
          paddingRight={index % 2 ? [0, 0, 0] : [0, 32, 32]}
          paddingLeft={index % 2 ? [0, 32, 32] : [0, 0, 0]}
        >
          <a
            href={partner.link}
            target="_blank"
            rel="noreferrer"
            className={supportersStyle.logo}
          >
            <img
              src={partner.logo.fixed.src}
              alt={partner.name}
              srcSet={partner.logo.fixed.srcSet}
            />
          </a>
        </Col>
      ))}
    </Row>
  )
}

export default Supporters

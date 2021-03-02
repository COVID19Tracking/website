/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import slugify from 'slugify'
import Modal from '~components/common/modal'
import thankYouStyle from './thank-you.module.scss'
import { Col, Row } from '~components/common/grid'

const ThankYou = () => {
  const [selected, setSelected] = useState(false)
  const data = useStaticQuery(graphql`
    {
      allAirtable(
        filter: { table: { eq: "Homepage" } }
        sort: { fields: data___Sort_Name }
      ) {
        nodes {
          data {
            Link_to_personal_site_or_social_media_account
            Name
            Short_bio
            Team_s_
            Image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 400, traceSVG: { color: "#FFAD4A" }) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const people = data.allAirtable.nodes
  return (
    <>
      <ul className={thankYouStyle.list}>
        {people.map(person => (
          <>
            <li
              key={person.data.Name}
              id={slugify(person.data.Name, { lower: true })}
            >
              <button type="button" onClick={() => setSelected(person)}>
                <div>
                  <Img
                    fluid={
                      person.data.Image.localFiles[0].childImageSharp.fluid
                    }
                    alt=""
                    className={thankYouStyle.image}
                    aria-hidden
                  />
                </div>
                <h3>{person.data.Name}</h3>{' '}
                {person.data.Team_s_ && <p>{person.data.Team_s_.join(', ')}</p>}
              </button>
            </li>
          </>
        ))}
      </ul>
      {selected && (
        <Modal isOpen onClose={() => setSelected(false)}>
          <Row className={thankYouStyle.modalContent}>
            <Col width={[1, 4, 8]}>
              <h3 className={thankYouStyle.modalHeader}>
                {selected.data.Name}
              </h3>
              {selected.data.Link_to_personal_site_or_social_media_account && (
                <p>
                  <a
                    href={
                      selected.data
                        .Link_to_personal_site_or_social_media_account
                    }
                    target="blank"
                    rel="noreferr"
                  >
                    Personal website
                  </a>
                </p>
              )}
              {selected.data.Team_s_ && (
                <p>
                  <strong>Teams: </strong>
                  <ul className={thankYouStyle.teams}>
                    {selected.data.Team_s_.map(team => (
                      <li>{team}</li>
                    ))}
                  </ul>
                </p>
              )}
              {selected.data.Short_bio && <p>{selected.data.Short_bio}</p>}
            </Col>
            <Col width={[1, 2, 4]}>
              <Img
                fluid={selected.data.Image.localFiles[0].childImageSharp.fluid}
                alt=""
                className={thankYouStyle.image}
                aria-hidden
              />
            </Col>
          </Row>
        </Modal>
      )}
    </>
  )
}

export default ThankYou

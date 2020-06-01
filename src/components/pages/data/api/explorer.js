import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import explorerStyles from './explorer.module.scss'
import definition from '../../../../../_api/v1/openapi.json'

const Fields = ({ schema }) => {
  const fields =
    definition.components.schemas[schema.split('/').pop()].properties

  return (
    <ul>
      {Object.keys(fields).map(property => (
        <li>
          <strong>
            <code>{property}</code>
          </strong>{' '}
          - {fields[property].description}
        </li>
      ))}
    </ul>
  )
}

const Path = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Disclosure onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={explorerStyles.button}>
        <h3>
          {definition.paths[path].get.description}{' '}
          <span aria-hidden>{isOpen ? <>↑</> : <>↓</>}</span>
        </h3>
      </DisclosureButton>
      <DisclosurePanel className={explorerStyles.panel}>
        <p>
          <strong>JSON URL:</strong>{' '}
          <code>
            <a href={path.replace('{format}', 'json')}>
              {path.replace('{format}', 'json')}
            </a>
          </code>
        </p>
        <p>
          <strong>CSV URL:</strong>{' '}
          <code>
            <a href={path.replace('{format}', 'json')}>
              {path.replace('{format}', 'json')}
            </a>
          </code>
        </p>
        <h4>Fields</h4>
        <Fields
          schema={
            definition.paths[path].get.responses[200].content[
              'application/json'
            ].schema.items.$ref
          }
        />
      </DisclosurePanel>
    </Disclosure>
  )
}

const Tag = ({ tag }) => (
  <>
    <h2>{tag}</h2>
    {Object.keys(definition.paths).map(path => (
      <>
        {definition.paths[path].get.tags.indexOf(tag) > -1 && (
          <Path path={path} />
        )}
      </>
    ))}
  </>
)

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          hiddenApiTags
        }
      }
    }
  `)
  const { hiddenApiTags } = data.site.siteMetadata
  const tags = []
  Object.keys(definition.paths).forEach(path => {
    if (definition.paths[path].get.tags) {
      definition.paths[path].get.tags.forEach(tag => {
        if (tags.indexOf(tag) === -1 && hiddenApiTags.indexOf(tag) === -1) {
          tags.push(tag)
        }
      })
    }
  })
  return (
    <>
      {tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
    </>
  )
}

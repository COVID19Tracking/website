import React, { useState, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import DetailText from '~components/common/detail-text'
import explorerStyles from './explorer.module.scss'
import definition from '../../../../../_api/v1/openapi.json'

const PreviewUrl = ({ path, format, parameters }) => {
  let examplePath = path.replace('{format}', format)
  parameters.forEach(parameter => {
    if (parameter.name !== 'format') {
      examplePath = examplePath.replace(
        `{${parameter.name}}`,
        parameter.schema.example,
      )
    }
  })
  return (
    <>
      <p>
        <code>{path.replace('{format}', format)}</code>
      </p>
      <p>
        <strong>Example:</strong>{' '}
        <code>
          <a href={examplePath}>{examplePath}</a>
        </code>
      </p>
    </>
  )
}

const Fields = ({ schema }) => {
  const fields =
    definition.components.schemas[schema.split('/').pop()].properties

  return (
    <dl>
      {Object.keys(fields).map(property => (
        <Fragment key={`${schema}-${property}`}>
          <dt>{property}</dt>
          <dd>
            <div className={explorerStyles.type}>
              <span className="a11y-only">Field type: </span>
              {fields[property].type}
            </div>
            <p>{fields[property].description}</p>

            {fields[property].type === 'integer' && fields[property].nullable && (
              <DetailText>
                Returns <code>null</code> if no data is available
              </DetailText>
            )}
          </dd>
        </Fragment>
      ))}
    </dl>
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
        <h4>JSON format</h4>
        <PreviewUrl
          path={path}
          format="json"
          parameters={definition.paths[path].get.parameters}
        />
        <h4>CSV format</h4>
        <PreviewUrl
          path={path}
          format="csv"
          parameters={definition.paths[path].get.parameters}
        />
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

/* eslint-disable max-len */
import React, { useState, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import marked from 'marked'
import DetailText from '~components/common/detail-text'
import explorerStyles from './explorer.module.scss'
import definition from '../../../../../_api/v1/openapi.json'

const PreviewUrl = ({ path, format, parameters }) => {
  let examplePath = path.replace('{format}', format).replace('/api/', '/')
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
      <p className={explorerStyles.pathDescription}>
        <code>{path.replace('{format}', format).replace('/api/', '/')}</code>
      </p>
      <p className={explorerStyles.pathDescription}>
        <strong>Example:</strong>{' '}
        <code>
          <a
            href={`https://api.covidtracking.com${examplePath}`}
          >{`https://api.covidtracking.com${examplePath}`}</a>
        </code>
      </p>
    </>
  )
}

const Fields = ({ schema, contentfulDefinitions }) => {
  const fields =
    definition.components.schemas[schema.split('/').pop()].properties

  return (
    <dl>
      {Object.keys(fields)
        .sort()
        .map(property => (
          <Fragment key={`${schema}-${property}`}>
            <dt>{property}</dt>
            <dd>
              <div className={explorerStyles.type}>
                <span className="a11y-only">Field type: </span>
                {fields[property].type}
              </div>
              {contentfulDefinitions[property] ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: contentfulDefinitions[property],
                  }}
                />
              ) : (
                <>
                  {fields[property].description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked(fields[property].description),
                      }}
                    />
                  )}
                </>
              )}

              {fields[property].type === 'integer' &&
                fields[property].nullable && (
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

const Path = ({ path, contentfulDefinitions }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Disclosure onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={explorerStyles.button}>
        <h3>
          {definition.paths[path].get.summary}{' '}
          <span aria-hidden className={explorerStyles.toggle}>
            {isOpen ? <>↑</> : <>↓</>}
          </span>
        </h3>
      </DisclosureButton>
      <DisclosurePanel className={explorerStyles.panel}>
        <p>{definition.paths[path].get.description}</p>
        {definition.paths[path].get['x-public-source-url'] && (
          <p>
            <a
              href={definition.paths[path].get['x-public-source-url']}
              target="_blank"
              without
              rel="noreferrer"
            >
              View data source{' '}
              <span className="a11y-only">
                for {definition.paths[path].get.summary}
              </span>
            </a>
          </p>
        )}
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
          contentfulDefinitions={contentfulDefinitions}
        />
      </DisclosurePanel>
    </Disclosure>
  )
}

const Tag = ({ tag, contentfulDefinitions }) => (
  <>
    <h2>{tag}</h2>
    {Object.keys(definition.paths).map(path => (
      <>
        {definition.paths[path].get.tags.indexOf(tag) > -1 && (
          <Path path={path} contentfulDefinitions={contentfulDefinitions} />
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
      allContentfulDataDefinition {
        nodes {
          fieldName
          childContentfulDataDefinitionDefinitionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)
  const contentfulDefinitions = {}
  data.allContentfulDataDefinition.nodes.forEach(node => {
    contentfulDefinitions[node.fieldName] =
      node.childContentfulDataDefinitionDefinitionTextNode.childMarkdownRemark.html
  })
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
        <Tag
          key={tag}
          tag={tag}
          contentfulDefinitions={contentfulDefinitions}
        />
      ))}
    </>
  )
}

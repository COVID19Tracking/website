import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import definition from '../../../../../_api/v1/openapi.json'

const Paths = ({ tag }) => {
  return <p>{tag}</p>
}

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
  console.log(definition)
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
        <>
          <h2>{tag}</h2>
          <Paths tag={tag} />
        </>
      ))}
    </>
  )
}

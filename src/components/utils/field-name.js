import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const fieldNames = {
  date: 'Date',
  negativeIncrease: 'Negative (increase)',
}

const getFieldName = (field, contentfulFields) => {
  const contentfulField = contentfulFields.find(
    definition => definition.fieldName === field,
  )
  if (contentfulField) {
    return contentfulField.name
  }
  if (typeof fieldNames[field] !== 'undefined') {
    return fieldNames[field]
  }
  return null
}

const FieldName = ({ field }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulDataDefinition(sort: { fields: name }) {
        nodes {
          name
          fieldName
        }
      }
    }
  `)

  return <>{getFieldName(field, data.allContentfulDataDefinition.nodes)}</>
}

export { FieldName, getFieldName }

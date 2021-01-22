import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Table, Th, Td } from '~components/common/table'

const ApiV2Conversion = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulDataDefinition(
        filter: { v2Name: { ne: null } }
        sort: { fields: fieldName }
      ) {
        nodes {
          fieldName
          v2Name
          priorNames
          name
          category
          type
        }
      }
    }
  `)

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th header alignLeft>
              V1 name
            </Th>
            <Th header alignLeft>
              V2 name
            </Th>
            <Th header alignLeft>
              Description
            </Th>
          </tr>
        </thead>
        <tbody>
          {data.allContentfulDataDefinition.nodes.map(node => (
            <tr>
              <Td alignLeft>
                <code>{node.fieldName}</code>
              </Td>
              <Td alignLeft>
                <code>{node.v2Name}</code>
              </Td>
              <Td alignLeft>{node.name}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ApiV2Conversion

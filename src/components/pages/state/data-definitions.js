import React from 'react'

export default ({ definitions }) => (
  <>
    <h2>Definitions</h2>
    {definitions.map(definition => (
      <>
        <h3>{definition.name}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html:
              definition.childContentfulDataDefinitionDefinitionTextNode
                .childMarkdownRemark.html,
          }}
        />
      </>
    ))}
  </>
)

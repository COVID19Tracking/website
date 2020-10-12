import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Container from '~components/common/container'
import CleanSpacing from '~components/utils/clean-spacing'
import { slugifyContentList } from '~components/utils/slugify-list'
import tocStyle from './table-of-contents.module.scss'

const TableOfContents = ({ content }) => {
  const headings = content.filter(node => node.nodeType.startsWith('heading'))
  headings.forEach(heading => {
    /* eslint-disable no-param-reassign */
    heading.slug = slugifyContentList(heading.content)
  })

  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <>
          {children.map(child => (
            <CleanSpacing>{child}</CleanSpacing>
          ))}
        </>
      ),
    },
  }
  return (
    <Container centered>
      <div className={tocStyle.tableOfContents}>
        <h2>Table of contents</h2>
        <ul>
          {headings.map(heading => (
            <li key={`toc-${heading.slug}`}>
              <a href={`#${heading.slug}`}>
                {documentToReactComponents(heading, options)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default TableOfContents

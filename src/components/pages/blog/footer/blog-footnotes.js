/* eslint-disable react/no-array-index-key */
import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import Container from '~components/common/container'
import blogFootnotesStyle from './blog-footnotes.module.scss'

const Footnote = ({ number, footnote }) => (
  <p id={`footnote-${number}`}>
    <Link to={`#original-footnote-${number}`}>
      <strong>{number}</strong>
    </Link>{' '}
    <span
      dangerouslySetInnerHTML={{
        __html: marked.inlineLexer(footnote, []),
      }}
    />
  </p>
)

const Footnotes = ({ footnoteText, content }) => {
  const footnotes = []

  content.content.forEach(entry => {
    if (typeof entry.content === 'undefined') {
      return
    }
    entry.content.forEach(item => {
      if (
        typeof item.nodeType === 'undefined' ||
        item.nodeType !== 'embedded-entry-inline' ||
        item.data.target.sys.contentType.sys.id !== 'contentBlockFootnote'
      ) {
        return
      }
      footnotes.push(item.data.target.fields.footnote['en-US'])
    })
  })
  if (!footnoteText && !footnotes.length) {
    return null
  }

  return (
    <Container centered>
      {footnoteText && (
        <div
          id="footnotes"
          className={blogFootnotesStyle.footnotes}
          dangerouslySetInnerHTML={{ __html: footnoteText }}
        />
      )}
      {footnotes.length && (
        <div className={blogFootnotesStyle.footnotes}>
          {footnotes.map((footnote, index) => (
            <Footnote
              key={`footnote-${index}`}
              number={index + 1}
              footnote={footnote}
            />
          ))}
        </div>
      )}
    </Container>
  )
}

export default Footnotes

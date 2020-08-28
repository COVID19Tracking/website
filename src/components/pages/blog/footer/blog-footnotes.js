import React from 'react'
import Container from '~components/common/container'
import blogFootnotesStyle from './blog-footnotes.module.scss'

const Footnotes = ({ footnotes }) => (
  <Container centered>
    <div
      id="footnotes"
      className={blogFootnotesStyle.footnotes}
      dangerouslySetInnerHTML={{ __html: footnotes }}
    />
  </Container>
)

export default Footnotes

import React from 'react'
import Container from '~components/common/container'
import blogFootnotesStyle from './blog-footnotes.module.scss'

export default ({ footnotes }) => (
  <Container centered>
    <div
      id="footnotes"
      className={blogFootnotesStyle.footnotes}
      dangerouslySetInnerHTML={{ __html: footnotes }}
    />
  </Container>
)

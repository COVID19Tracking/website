import React from 'react'
import { Link } from 'gatsby'

const FootnoteContentBlock = ({ number }) => (
  <sup id={`original-footnote-${number}`}>
    <Link to={`#footnote-${number}`}>{number}</Link>
  </sup>
)

export default FootnoteContentBlock

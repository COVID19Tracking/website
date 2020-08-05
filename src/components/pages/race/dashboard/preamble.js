import React from 'react'
import smartypants from 'smartypants'
import Container from '~components/common/container'

import preambleStyles from './preamble.module.scss'

export default ({ raceHeroSnippetHtml }) => (
  <Container narrow>
    <h1 className={preambleStyles.header}>
      Here&#8217;s the latest race and ethnicity data from every state and
      territory that reports it.
    </h1>
    <div
      dangerouslySetInnerHTML={{
        __html: smartypants(raceHeroSnippetHtml),
      }}
    />
  </Container>
)

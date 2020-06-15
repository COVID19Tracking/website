import React from 'react'
import classnames from 'classnames'
import Container from '~components/common/container'
import spacers from './spacers.module.scss'

export default {
  title: 'Layout',
}

const SampleContainer = () => (
  <div style={{ background: 'grey', height: '200px' }} />
)

export const container = () => (
  <Container>
    <SampleContainer />
  </Container>
)
container.story = {
  parameters: {
    info: {
      text:
        'An element that floats in the middle of the page and is useful to wrap content.',
    },
  },
}

export const containerNarrow = () => (
  <Container narrow>
    <SampleContainer />
  </Container>
)
containerNarrow.story = {
  parameters: {
    info: {
      text:
        'A narrow element that aligns to the left side of the page and is useful to wrap content.',
    },
  },
}

const spacerItems = []
Object.keys(spacers).forEach(spacer => {
  if (spacer.search('spacer-') > -1) {
    spacerItems.push({
      class: spacer,
      size: spacer.replace('spacer-', ''),
    })
  }
})

export const spacing = () => (
  <>
    <p>
      Instead of using absolute sizes for margins and paddings, use our standard
      spacers. For example:
    </p>
    <code>
      <pre>
        {`.my-class {
  margin: spacer(16);
}`}
      </pre>
    </code>
    {spacerItems.map(spacer => (
      <div className={spacers.key} key={spacer.size}>
        <div className={spacers.wrap}>
          <div className={classnames(spacers.spacer, spacers[spacer.class])} />
        </div>
        <code>spacer({spacer.size})</code>
      </div>
    ))}
  </>
)

containerNarrow.story = {
  parameters: {
    info: {
      text: 'Use the mixin `spacer([number]) to define margins and padding.',
    },
  },
}

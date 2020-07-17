import loadable from '@loadable/component'

export default loadable(() =>
  import('~components/pages/experiments/scrollytelling'),
)

import React from 'react'
import loadable from '@loadable/component'

// TODO: Maybe use gatsby to import this data in a more scalable way
// instead of individual filesnames

import pooled0 from '~images/experiments/pooled_testing_00.jpg'
import pooled1 from '~images/experiments/pooled_testing_01.jpg'
import pooled2 from '~images/experiments/pooled_testing_02.jpg'
import pooled3 from '~images/experiments/pooled_testing_03.jpg'
import pooled4 from '~images/experiments/pooled_testing_04.jpg'
import pooled5 from '~images/experiments/pooled_testing_05.jpg'
import pooled6 from '~images/experiments/pooled_testing_06.jpg'
import pooled7 from '~images/experiments/pooled_testing_07.jpg'

const ScrollyTelling = loadable(() =>
  import('~components/pages/experiments/scrollytelling/pooled-testing'),
)

export default () => (
  <ScrollyTelling
    images={[pooled0, pooled1, pooled2, pooled3, pooled4, pooled5, pooled6, pooled7]}
  />
)

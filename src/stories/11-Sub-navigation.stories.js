import React from 'react'
import SubNavigation from '../components/common/sub-navigation'

export default {
  title: 'Sub navigation',
}

export const navigation = () => (
  <SubNavigation
    navigation={[
      { title: 'Page A', link: '/a' },
      { title: 'Page B', link: '/b' },
      { title: 'Page C', link: '/c' },
    ]}
  />
)

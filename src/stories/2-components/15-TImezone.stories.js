import React from 'react'
import Timezone from '~components/common/timezone'

export default {
  title: 'Timezone indicator ',
}

Timezone.displayName = 'Timezone'

export const timezoneIndicator = () => <Timezone />

timezoneIndicator.story = {
  parameters: {
    info: {
      text: `A helper utility that shows a timezone (EDT or EST) depending on whether the site's latest build
      was in daylight savings time. Adds an abbreviation tag around the zone acronym for accessibility.`,
    },
  },
}

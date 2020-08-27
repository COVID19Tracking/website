import React from 'react'
import {
  Infobox,
  QuestionInfobox,
  AlertInfobox,
} from '~components/common/infobox'

export default {
  title: 'Infobox',
}

export const infobox = () => (
  <Infobox header="This is an infobox header">Infobox content here</Infobox>
)

infobox.story = {
  parameters: {
    info: {
      text:
        'This is a blank infobox. See below for specifically styled infoboxes. Content is an optional parameter.',
    },
  },
}

export const alertinfobox = () => (
  <AlertInfobox header="Oh no! This is an alert">
    Something is broken...
  </AlertInfobox>
)

export const questioninfobox = () => (
  <QuestionInfobox header="What does this mean?">
    More information about this question
  </QuestionInfobox>
)

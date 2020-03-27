import React from 'react'
import { Infobox, SyncInfobox, AlertInfobox } from '../components/common/infobox'

export default {
  title: 'Infobox',
}

export const infobox = () => (
  <Infobox header={"This is an infobox header"} content={"Infobox content here"} />
)

infobox.story = {
  parameters: {
    info: {
      text:
        'This is a blank infobox. See below for specifically styled infoboxes.',
    },
  },
}

export const syncinfobox = () => (
  <SyncInfobox />
)

syncinfobox.story = {
  parameters: {
    info: {
      text:
        'This is specific to the us-daily table (it uses a static GraphQL query to pull that last updated time).',
    },
  },
}

export const alertinfobox = () => (
  <AlertInfobox header="Oh no! This is an alert" content="Something is broken..."/>
)

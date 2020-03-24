import React from 'react'
import LeadParagraph from '../components/common/lead-paragraph'

export default {
  title: 'Lead paragraph',
}

export const LeadParagraphStory = () => (
  <LeadParagraph>
    The COVID Tracking Project collects information from 50 US states, the
    District of Columbia, and 5 other US territories to provide the most
    comprehensive testing data we can collect for the novel coronavirus,
    SARS-CoV-2. We attempt to include{' '}
    <strong>positive and negative results</strong>,{' '}
    <strong>pending tests</strong>, and <strong>total people tested for</strong>{' '}
    each state or district currently reporting that data.
  </LeadParagraph>
)

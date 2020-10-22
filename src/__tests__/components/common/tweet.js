import React from 'react'
import renderer from 'react-test-renderer'
import Tweet from '~components/common/tweet'

const sampleTweet = {
  created_at: 'Tue Oct 20 23:11:41 +0000 2020',
  id_str: '1318691388242956291',
  media: 'http://pbs.twimg.com/media/EkzuvoHXUAARG6C.jpg',
  full_text:
    'We’ve written about the ways that states are reporting  antigen tests, which are becoming a major tool for rapid COVID-19 testing. But if states don’t report results clearly, we won’t know the true impact of these tests.\n\n https://t.co/gJqykAtJfR',
}

describe('Components : Common: Tweet', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Tweet
          text={sampleTweet.full_text}
          link={`https://twitter.com/${sampleTweet.id_str}`}
          date={sampleTweet.created_at}
          media={sampleTweet.media}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeWithoutMedia = renderer
      .create(
        <Tweet
          text={sampleTweet.full_text}
          link={`https://twitter.com/${sampleTweet.id_str}`}
          date={sampleTweet.created_at}
        />,
      )
      .toJSON()
    expect(treeWithoutMedia).toMatchSnapshot()
  })
})

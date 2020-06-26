import React from 'react'
import copy from 'copy-to-clipboard'

import facebookIcon from '~images/social-shares/facebook.svg'
import twitterIcon from '~images/social-shares/twitter.svg'
import linkIcon from '~images/social-shares/link.svg'

import socialSharingStyles from './social-sharing.module.scss'

export default ({ shares, url, text }) => {
  const copyUrl = () => copy(url)
  const types = {
    facebook: {
      icon: facebookIcon,
      alt: 'Share on Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    twitter: {
      icon: twitterIcon,
      alt: 'Share on Twitter',
      url: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    },
    link: { icon: linkIcon, alt: 'Copy link', url: '#', onClick: copyUrl },
    // todo include copy success message/icon change
  }
  return (
    <div className={socialSharingStyles.wrapper}>
      {shares.map(share => (
        <a
          href={types[share].url}
          onClick={types[share].onClick}
          className={socialSharingStyles.socialButton}
        >
          <img src={types[share].icon} alt={types[share].alt} />
        </a>
      ))}
    </div>
  )
}

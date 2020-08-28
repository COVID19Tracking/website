import React, { useState } from 'react'
import copy from 'copy-to-clipboard'

import facebookIcon from '~images/social-shares/facebook.svg'
import twitterIcon from '~images/social-shares/twitter.svg'
import linkIcon from '~images/social-shares/link.svg'

import socialSharingStyles from './social-sharing.module.scss'

const SocialSharing = ({ shares, url, text }) => {
  const [isCopied, setIsCopied] = useState(false)

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
    link: {
      icon: linkIcon,
      alt: 'Copy link',
      url: '#',
      onClick: event => {
        event.preventDefault() // don't follow the link
        copy(url) // copy the url to the clipboard
        setIsCopied(true) // update state to show span
        setTimeout(() => {
          setIsCopied(false) // revert state in 4s
        }, 4000)
      },
    },
  }
  return (
    <div className={socialSharingStyles.wrapper}>
      {isCopied && (
        <span className={socialSharingStyles.linkCopied} aria-live="polite">
          Link copied!
        </span>
      )}
      {shares.map(share => (
        <a
          href={types[share].url}
          onClick={types[share].onClick}
          className={socialSharingStyles.socialButton}
          key={share}
        >
          <img src={types[share].icon} alt={types[share].alt} />
        </a>
      ))}
    </div>
  )
}

export default SocialSharing

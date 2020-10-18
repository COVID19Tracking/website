import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import classnames from 'classnames'

import facebookIcon from '~images/social-shares/facebook.svg'
import twitterIcon from '~images/social-shares/twitter.svg'
import linkIcon from '~images/social-shares/link.svg'

import socialSharingStyles from './social-sharing.module.scss'

const getTwitterLink = (text, url, twitterText, textIncludesUrl) => {
  const textToShare = twitterText || text
  if (textIncludesUrl) {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      textToShare,
    )}`
  }
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(textToShare)}`
}

const SocialSharing = ({
  shares,
  url,
  text,
  twitterText,
  className,
  outlineOnly,
  textIncludesUrl = false,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const types = {
    facebook: {
      icon: facebookIcon,
      alt: 'Share on Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
      // todo include text in the fb url
    },
    twitter: {
      icon: twitterIcon,
      alt: 'Share on Twitter',
      url: getTwitterLink(text, url, twitterText, textIncludesUrl),
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
    <div className={classnames(socialSharingStyles.wrapper, className)}>
      {isCopied && (
        <span className={socialSharingStyles.linkCopied} aria-live="polite">
          Link copied!
        </span>
      )}
      {shares.map(share => (
        <a
          href={types[share].url}
          onClick={types[share].onClick}
          className={classnames(
            socialSharingStyles.socialButton,
            outlineOnly && socialSharingStyles.outlineOnly,
          )}
          key={share}
        >
          <img src={types[share].icon} alt={types[share].alt} />
        </a>
      ))}
    </div>
  )
}

export default SocialSharing

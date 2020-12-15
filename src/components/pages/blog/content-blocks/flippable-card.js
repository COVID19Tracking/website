import React, { useState } from 'react'
import classnames from 'classnames'
import cardStyles from './flippable-card.module.scss'

const FlippableCard = ({ width, height, front, back, alternateText }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  return (
    <div className={cardStyles.card}>
      <button
        className={cardStyles.button}
        type="button"
        onClick={() => {
          setIsFlipped(!isFlipped)
        }}
      >
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          className={classnames(
            cardStyles.flipCard,
            isFlipped && cardStyles.flipped,
          )}
        >
          <div className={cardStyles.inner}>
            <div className={cardStyles.front}>
              <img src={front.fixed.src} aria-hidden alt="" />
            </div>
            <div className={cardStyles.back}>
              <img src={back.fixed.src} aria-hidden alt="" />
            </div>
          </div>
        </div>
      </button>
      <div className="a11y-only">{alternateText}</div>
      <p aria-hidden className={cardStyles.directions}>
        Click or tap card to flip it.
      </p>
    </div>
  )
}

export default FlippableCard

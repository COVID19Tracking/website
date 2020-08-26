import React from 'react'
import infoBoxStyle from './infobox.module.scss'
import alertIcon from '~images/infobox-icons/alert.svg'
import questionIcon from '~images/infobox-icons/question.svg'

const InfoboxInner = ({ header, children }) => (
  <div>
    <p className={infoBoxStyle.header}>{header}</p>
    <div className={infoBoxStyle.content}>{children}</div>
  </div>
)

const Infobox = ({ header, children }) => (
  <div className={`infobox ${infoBoxStyle.infobox}`}>
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

// Currently the only one using fullSize but this could be added to any/all
const AlertInfobox = ({ header, children, fullSize = false }) => (
  <div
    className={`infobox alert ${infoBoxStyle.infobox} ${
      infoBoxStyle.alert
    } ${fullSize && infoBoxStyle.fullSize}`}
  >
    <img src={alertIcon} alt="Alert icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

const QuestionInfobox = ({ header, children }) => (
  <div
    className={`infobox question ${infoBoxStyle.infobox} ${infoBoxStyle.question}`}
  >
    <img src={questionIcon} alt="Question icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

export { Infobox, AlertInfobox, QuestionInfobox }

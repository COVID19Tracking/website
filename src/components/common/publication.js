import React from 'react'
import publicationStyle from './publication.module.scss'

const PublicationTitle = ({ children }) => (
  <cite className={publicationStyle.title}>{children}</cite>
)

const PublicationSource = ({ children }) => (
  <span className={publicationStyle.source}>{children}</span>
)

export { PublicationTitle, PublicationSource }

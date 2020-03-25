import React from 'react'
import '../../scss/components/hero.scss'
import { ButtonLink } from './button'

export default ({ children }) => (
  <div className="hero">
    <p className="header">
      The COVID Tracking Project aims to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2.
    </p>
    <div className="ctas">
      <ButtonLink big to={'/data'}>Get the Data</ButtonLink>
      <ButtonLink big to={'/about'}>About the Data</ButtonLink>
    </div>
  </div>
)

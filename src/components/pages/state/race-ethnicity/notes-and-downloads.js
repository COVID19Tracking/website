import React from 'react'
import { Link } from 'gatsby'

import RacialDataSmallCard from '~components/pages/data/cards/small/view-racial-data-small-card'
import DataAsGraphicSmallCard from '~components/pages/data/cards/small/data-as-graphic-small-card'

import styles from './notes-and-downloads.module.scss'

const NotesAndDownloads = ({
  slug,
  stateAbbreviation,
  stateName,
  notesList,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <h4>Notes</h4>
        <ol>
          {notesList.map(note => (
            <li key={note}>{note}</li>
          ))}
        </ol>
      </div>
      <div className={styles.downloadsContainer}>
        <h4>Download dataset</h4>
        <div className={styles.links}>
          {/** todo update the href to the state's crdt csv */}
          <a
            href={`#${slug}`}
            aria-label={`Download ${stateName}'s racial data data as CSV`}
          >
            CSV
          </a>
          {/** todo update the href to the state's metadata */}
          <Link to="/data/api" aria-label={`Download ${stateName}'s Metadata`}>
            Metadata
          </Link>
        </div>
        <div className={styles.smallCards}>
          <RacialDataSmallCard
            stateAbbreviation={stateAbbreviation}
            stateName={stateName}
            content="View racial data dashboard"
          />
          <DataAsGraphicSmallCard
            stateAbbreviation={stateAbbreviation}
            stateName={stateName}
          />
        </div>
      </div>
    </div>
  )
}

export default NotesAndDownloads

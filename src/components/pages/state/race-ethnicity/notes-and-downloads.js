import React from 'react'
import { Link } from 'gatsby'

import RacialDataSmallCard from '~components/pages/data/cards/small/view-racial-data-small-card'

import styles from './notes-and-downloads.module.scss'

const NotesAndDownloads = ({ slug, stateAbbreviation, stateName }) => {
  // todo pass notes to this component
  const notes = [
    'Note one',
    'Note two',
    'Note three',
    'Note four',
    'Note five',
    'Note six',
    'Note seven',
    'Note eight',
    'Note nine',
  ]

  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <h4>Notes</h4>
        <ol>
          {notes.map(note => (
            <li>{note}</li>
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
        <RacialDataSmallCard
          stateAbbreviation={stateAbbreviation}
          stateName={stateName}
          content="View racial data dashboard"
        />
      </div>
    </div>
  )
}

export default NotesAndDownloads

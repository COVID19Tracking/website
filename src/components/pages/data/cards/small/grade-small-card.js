import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import gradeSmallAPlus from '~images/state-grades/small/a-plus.svg'
import gradeSmallA from '~images/state-grades/small/a.svg'
import gradeSmallB from '~images/state-grades/small/b.svg'
import gradeSmallC from '~images/state-grades/small/c.svg'
import gradeSmallD from '~images/state-grades/small/d.svg'
import gradeSmallF from '~images/state-grades/small/f.svg'
import gradeSmallNA from '~images/state-grades/small/na.svg'

import gradeSmallCardStyles from './grade-small-card.module.scss'

const grades = {
  'a+': {
    small: gradeSmallAPlus,
  },
  a: {
    small: gradeSmallA,
  },
  b: { small: gradeSmallB },
  c: {
    small: gradeSmallC,
  },
  d: {
    small: gradeSmallD,
  },
  f: { small: gradeSmallF },
  na: { small: gradeSmallNA },
}

// todo set link destination

const GradeSmallCard = ({ grade }) => (
  <SmallCard destination="#">
    <SmallCardIcon>
      <img
        src={
          grade && typeof grades[grade.toLowerCase()] !== 'undefined'
            ? grades[grade.toLowerCase()].small
            : grades.na.small
        }
        className={gradeSmallCardStyles.grade}
        alt={`Grade ${grade}`}
        aria-hidden
      />
    </SmallCardIcon>
    <SmallCardLink>Current race & ethnicity data quality grade</SmallCardLink>
  </SmallCard>
)

export default GradeSmallCard

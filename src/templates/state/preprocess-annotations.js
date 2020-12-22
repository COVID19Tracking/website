import React, { useContext } from 'react'
import {
  AnnotationButton,
  AnnotationPanelContext,
} from '~components/pages/data/cards/definitions-panel'
import { AnnotationBubble } from '~components/charts/bar-chart'

import tableResponsiveStyles from '~components/common/table-responsive.module.scss'

const indexToLetter = index => {
  return (index + 10).toString(36).toUpperCase()
}

const AnnotationIcon = ({ annotation, annotationFields }) => {
  const annotationContext = useContext(AnnotationPanelContext)

  const index = annotationFields.findIndex(f => f === annotation.field)

  return (
    <div className={tableResponsiveStyles.annotation}>
      <AnnotationButton field={annotation.date}>
        <AnnotationBubble
          content={{ annotationSymbol: indexToLetter(index) }}
          handleAnnotationClick={() => {
            annotationContext.setCardAnnotations({
              fields: annotationFields,
              highlight: annotation.date,
            })
          }}
        />
      </AnnotationButton>
    </div>
  )
}

const preprocessAnnotations = (annotationsList, data) => {
  const dataRows = data
  const annotations = annotationsList

  dataRows.forEach((row, i) => {
    dataRows[i].dateWithAnnotation = row.date
  })

  // A list of the dates with annotations.
  const annotationDates = annotations.map(annotation => annotation.date)

  annotations.forEach((annotation, index) => {
    // Standardize the content for the DefinitionsPanel.
    annotations[index].field = annotation.date
    annotations[index].htmlFormat = true
    annotations[index].warning =
      annotation.childContentfulChartAnnotationDescriptionTextNode.childMarkdownRemark.html

    // Match annotations with their respective days.
    const row = dataRows.findIndex(r => r.date === annotation.date)

    // Add the annotation icon to the dateWithAnnotation value.
    dataRows[row].dateWithAnnotation = (
      <>
        <AnnotationIcon
          annotation={annotation}
          annotationFields={annotationDates}
        />
        {dataRows[row].date}
      </>
    )
  })

  return {
    annotations,
    dataRows,
  }
}

export default preprocessAnnotations

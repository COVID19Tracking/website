import preprocessAnnotations from '~templates/state/preprocess-annotations'

const data = [
  {
    state: 'TX',
    date: 'Dec 20, 2020',
    deathProbable: 946,
    deathIncrease: 2,
    deathConfirmed: 9437,
    death: 10383,
    recovered: null,
  },
  {
    state: 'TX',
    date: 'Dec 19, 2020',
    deathProbable: 946,
    deathIncrease: 49,
    deathConfirmed: 9435,
    death: 10381,
    recovered: null,
  },
  {
    state: 'TX',
    date: 'Dec 18, 2020',
    deathProbable: 936,
    deathIncrease: 38,
    deathConfirmed: 9396,
    death: 10332,
    recovered: null,
  },
]

describe('Templates : State : preprocessAnnotations', () => {
  describe('preprocessAnnotations', () => {
    test('two annotations', () => {
      const annotations = [
        {
          date: 'Dec 19, 2020',
          childContentfulChartAnnotationDescriptionTextNode: {
            childMarkdownRemark: {
              html: '<p>Annotation.</p>',
            },
          },
        },
        {
          date: 'Dec 20, 2020',
          childContentfulChartAnnotationDescriptionTextNode: {
            childMarkdownRemark: {
              html: '<p>Annotation No. 2.</p>',
            },
          },
        },
      ]
      expect(preprocessAnnotations(annotations, data)).toMatchSnapshot()
    })
    test('one annotation', () => {
      const annotations = [
        {
          date: 'Dec 19, 2020',
          childContentfulChartAnnotationDescriptionTextNode: {
            childMarkdownRemark: {
              html: '<p>Annotation.</p>',
            },
          },
        },
      ]
      expect(preprocessAnnotations(annotations, data)).toMatchSnapshot()
    })
    test('no annotations', () => {
      expect(preprocessAnnotations([], data)).toMatchSnapshot()
    })
  })
})

/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { CautionSymbol, DisparitySymbol } from './table-symbols'
import tableSymbolKeyStyles from './table-symbol-key.module.scss'

const DisparityWarningContent = () => (
  <>
    <h3>How we calculate likely racial/ethnic disparity</h3>

    <p>
      We flag a group&apos;s case or death proportion as suggestive of
      racial/ethnic disparity when it meets three criteria:
    </p>
    <ol>
      <li>Is at least 33% higher than the Census Percentage of Population.</li>
      <li>
        Remains elevated whether we include or exclude cases/deaths with unknown
        race/ethnicity.
      </li>
      <li>Is based on at least 30 actual cases or deaths.</li>
    </ol>
  </>
)

const ComparableWarningContent = () => (
  <>
    <h3>How we decide data is not comparable</h3>

    <p>
      We use this flag when a state has chosen to report race and ethnicity
      using different categories than the US Census, which are the categories we
      use for population data. For example:
    </p>

    <ol>
      <li>
        Census separates Asian and Native Hawaiian or Other Pacific Islander
        into two categories. Some states combine these groups into one panracial
        category.
      </li>
      <li>
        Some states combine people from multiple Census categories into a single
        category called &quot;Other.&quot;
      </li>
      <li>
        Some states use a category labeled &quot;Other&quot; without defining
        which racial groups that category includes.
      </li>
      <li>
        Census reports race and ethnicity in mutually exclusive categories. Some
        states report cases or deaths in more than one racial/ethnic category.
      </li>
    </ol>
    <p>See specific details for each instance in that state’s footnotes.</p>
  </>
)

export default ({ state }) => {
  const [disparityOpen, setDisparityOpen] = useState(false)
  const [comparibleOpen, setComparibleOpen] = useState(false)

  return (
    <div className={tableSymbolKeyStyles.container}>
      <p className={tableSymbolKeyStyles.key}>
        <DisparitySymbol inkey />
        Racial/ethnic disparity likely.{' '}
        <button
          className={`js-enabled ${tableSymbolKeyStyles.disclosureButton}`}
          aria-expanded={disparityOpen}
          aria-controls={`table-symbol-disparity-${state.toLowerCase()}`}
          onClick={event => {
            event.preventDefault()
            setDisparityOpen(!disparityOpen)
            if (comparibleOpen) {
              setComparibleOpen(false)
            }
          }}
        >
          <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
          <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
        </button>
        <a href="#table-disparity-key" className="js-disabled">
          <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
          <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
        </a>
      </p>
      <p className={tableSymbolKeyStyles.key}>
        <CautionSymbol inkey />
        Should not be compared with percentage of population.{' '}
        <button
          className={`js-enabled ${tableSymbolKeyStyles.disclosureButton}`}
          aria-expanded={disparityOpen}
          aria-controls={`table-symbol-notComparible-${state.toLowerCase()}`}
          onClick={event => {
            event.preventDefault()
            setComparibleOpen(!comparibleOpen)
            if (disparityOpen) {
              setDisparityOpen(false)
            }
          }}
        >
          <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
          <span aria-hidden>{comparibleOpen ? <>↑</> : <>↓</>}</span>
        </button>
        <a href="#table-comparable-key" className="js-disabled">
          <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
          <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
        </a>
      </p>
      <div />
      <div
        id={`table-symbol-disparity-${state.toLowerCase()}`}
        hidden={!disparityOpen}
        className={tableSymbolKeyStyles.disclosurePane}
        data-expanded={disparityOpen}
      >
        <DisparityWarningContent />
      </div>
      <div
        id={`table-symbol-notComparible-${state.toLowerCase()}`}
        hidden={!comparibleOpen}
        className={tableSymbolKeyStyles.disclosurePane}
        data-expanded={comparibleOpen}
      >
        <ComparableWarningContent />
      </div>
    </div>
  )
}

export { DisparityWarningContent, ComparableWarningContent }

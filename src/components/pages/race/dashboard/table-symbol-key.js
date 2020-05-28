/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import {
  CautionSymbol,
  DisparitySymbol,
} from '~components/pages/race/dashboard/table-symbols'
import tableSymbolStyles from '~components/pages/race/dashboard/table-symbol-key.module.scss'

export default ({ state }) => {
  const [disparityOpen, setDisparityOpen] = useState(false)
  const [comparibleOpen, setComparibleOpen] = useState(false)

  return (
    <div className={tableSymbolStyles.container}>
      <p className={tableSymbolStyles.key}>
        <DisparitySymbol inkey />
        Racial/ethnic disparity likely.{' '}
        <button
          className={tableSymbolStyles.disclosureButton}
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
          <span className={tableSymbolStyles.text}>See why</span>{' '}
          <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
        </button>
      </p>
      <p className={tableSymbolStyles.key}>
        <CautionSymbol inkey />
        Should not be compared with percentage of population.{' '}
        <button
          className={tableSymbolStyles.disclosureButton}
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
          <span className={tableSymbolStyles.text}>See why</span>{' '}
          <span aria-hidden>{comparibleOpen ? <>↑</> : <>↓</>}</span>
        </button>
      </p>
      <div />
      <div
        id={`table-symbol-disparity-${state.toLowerCase()}`}
        hidden={!disparityOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={disparityOpen}
      >
        <h3>How we calculate likely racial/ethnic disparity</h3>

        <p>
          We flag a group&apos;s case or death proportion as suggestive of
          racial/ethnic disparity when it meets three criteria:
        </p>
        <ol>
          <li>
            Is at least 33% higher than the Census Percentage of Population.
          </li>
          <li>
            Remains elevated whether we include or exclude cases/deaths with
            unknown race/ethnicity.
          </li>
          <li>Is based on at least 30 actual cases or deaths.</li>
        </ol>
      </div>
      <div
        id={`table-symbol-notComparible-${state.toLowerCase()}`}
        hidden={!comparibleOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={comparibleOpen}
      >
        <h3>How we decide data is not comparable</h3>

        <p>
          We use this flag when a state has chosen to report race and ethnicity
          using different categories than the US Census, which are the
          categories we use for population data. For example:
        </p>

        <ol>
          <li>
            Census separates Asian and Native Hawaiian or Other Pacific Islander
            into two categories. Some states combine these groups into one
            panracial category.
          </li>
          <li>
            Some states combine people from multiple Census categories into a
            single category called &quot;Other.&quot;
          </li>
          <li>
            Some states use a category labeled &quot;Other&quot; without
            defining which racial groups that category includes.
          </li>
          <li>
            Census reports race and ethnicity in mutually exclusive categories.
            Some states report cases or deaths in more than one racial/ethnic
            category.
          </li>
        </ol>
        <p>See specific details for each instance in that state’s footnotes.</p>
      </div>
    </div>
  )
}

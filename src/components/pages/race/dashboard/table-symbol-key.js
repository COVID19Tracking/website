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

const TableKeyContentItem = ({
  state,
  symbol,
  description,
  divAnchor,
  setOpenMethod,
  openBoolean,
  alternateBoolean,
  setOpenAlternate,
}) => (
  <p className={tableSymbolKeyStyles.key}>
    {symbol}
    <span>{description}</span>
    <button
      className={`js-enabled ${tableSymbolKeyStyles.disclosureButton}`}
      aria-expanded={alternateBoolean}
      aria-controls={`table-symbol-notComparible-${state.toLowerCase()}`}
      onClick={event => {
        event.preventDefault()
        setOpenMethod(!openBoolean)
        if (alternateBoolean) {
          setOpenAlternate(false)
        }
      }}
    >
      <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
      <span aria-hidden>{openBoolean ? <>↑</> : <>↓</>}</span>
    </button>
    <a href={divAnchor} className="js-disabled">
      <span className={tableSymbolKeyStyles.text}>See why</span>{' '}
      <span aria-hidden>{openBoolean ? <>↑</> : <>↓</>}</span>
    </a>
  </p>
)

export default ({ state }) => {
  const [disparityOpen, setDisparityOpen] = useState(false)
  const [comparibleOpen, setComparibleOpen] = useState(false)

  return (
    <div className={tableSymbolKeyStyles.container}>
      <TableKeyContentItem
        state={state}
        symbol={<CautionSymbol inkey />}
        description="Should not be compared with percentage of population. "
        divAnchor="#table-comparable-key"
        setOpenMethod={setDisparityOpen}
        openBoolean={disparityOpen}
        alternateBoolean={comparibleOpen}
        setOpenAlternate={setComparibleOpen}
      />
      <TableKeyContentItem
        state={state}
        symbol={<DisparitySymbol inkey />}
        description="Racial/ethnic disparity likely. "
        divAnchor="#table-disparity-key"
        setOpenMethod={setComparibleOpen}
        openBoolean={comparibleOpen}
        alternateBoolean={disparityOpen}
        setOpenAlternate={setDisparityOpen}
      />
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

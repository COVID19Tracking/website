import React, { useState, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import DetailText from '~components/common/detail-text'
import explorerStyles from './explorer.module.scss'

const Fields = ({ fields }) => (
  <dl>
    {fields.map(field => (
      <Fragment key={field.fieldName}>
        <dt>{field.fieldName}</dt>
        <dd>
          <div className={explorerStyles.type}>
            <span className="a11y-only">Field type: </span>
            {field.type}
          </div>
          <p>
            <strong>{field.title}</strong>
          </p>
          <p>{field.description}</p>

          {field.type === 'integer' && (
            <DetailText>
              Returns <code>null</code> if no data is available
            </DetailText>
          )}
        </dd>
      </Fragment>
    ))}
  </dl>
)

const Section = ({ title, fields }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Disclosure onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={explorerStyles.button}>
        <h3>
          {title}{' '}
          <span aria-hidden className={explorerStyles.toggle}>
            {isOpen ? <>↑</> : <>↓</>}
          </span>
        </h3>
      </DisclosureButton>
      <DisclosurePanel className={explorerStyles.panel}>
        <p>A full timeseries of data by state.</p>
        <h4>Fields</h4>
        <Fields fields={fields} />
      </DisclosurePanel>
    </Disclosure>
  )
}

const CrdtExplorer = () => {
  const data = useStaticQuery(graphql`
    {
      allCrdtApi(sort: { fields: fieldName }) {
        nodes {
          fieldName
          description
          title
          type
        }
      }
    }
  `)

  return (
    <>
      <Section title="Timeseries" fields={data.allCrdtApi.nodes} />
    </>
  )
}

export default CrdtExplorer

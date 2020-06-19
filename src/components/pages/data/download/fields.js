import React from 'react'
import DetailText from '~components/common/detail-text'
import styles from './fields.module.scss'
import definition from '../../../../../_api/v1/openapi.json'

export default ({ schema }) => {
  const fields = definition.components.schemas[schema].properties

  return (
    <dl className={styles.fields}>
      {Object.keys(fields)
        .sort()
        .map(property => (
          <div key={`${schema}-${property}`}>
            <dt>{property}</dt>
            <dd>
              <div className={styles.type}>
                <span className="a11y-only">Field type: </span>
                {fields[property].type}
              </div>
              <p>{fields[property].description}</p>

              {fields[property].type === 'integer' &&
                fields[property].nullable && (
                  <DetailText>
                    Returns <code>null</code> if no data is available
                  </DetailText>
                )}
            </dd>
          </div>
        ))}
    </dl>
  )
}

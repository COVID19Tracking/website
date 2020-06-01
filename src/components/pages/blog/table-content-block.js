import React from 'react'
import marked from 'marked'
import tableStyle from '~components/common/table.module.scss'
import tableContentBlockStyle from './table-content-bock.module.scss'

export default ({ table }) => (
  <div
    className={`${tableStyle.table} ${tableContentBlockStyle.table}`}
    dangerouslySetInnerHTML={{
      __html: marked(table),
    }}
  />
)

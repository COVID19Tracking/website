import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import sidebarStyles from './sidebar-block.module.scss'

const SidebarContentBlock = ({ headline, lede, references }) => (
  <div className={sidebarStyles.wrapper}>
    <aside className={sidebarStyles.sidebar}>
      <h3 className={sidebarStyles.headline}>{headline}</h3>
      {lede && <div dangerouslySetInnerHTML={{ __html: marked(lede) }} />}
      <ul>
        {references.map(reference => (
          <li key={reference.fields.slug['en-US']}>
            <Link to={`/blog/${reference.fields.slug['en-US']}`}>
              {reference.fields.title['en-US']}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  </div>
)

export default SidebarContentBlock

import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import relatedPostStyles from './related-posts-block.module.scss'

const RelatedPostsContentBlock = ({ headline, subtitle, references }) => (
  <aside className={relatedPostStyles.pullout}>
    <h3 className={relatedPostStyles.headline}>{headline}</h3>
    {subtitle && (
      <div
        className={relatedPostStyles.subtitle}
        dangerouslySetInnerHTML={{ __html: marked(subtitle) }}
      />
    )}
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
)

export default RelatedPostsContentBlock

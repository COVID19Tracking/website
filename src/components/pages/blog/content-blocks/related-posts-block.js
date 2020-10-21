import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import relatedPostStyles from './related-posts-block.module.scss'

const RelatedPostsContentBlock = ({ headline, lede, references }) => (
  <aside className={relatedPostStyles.pullout}>
    <h3 className={relatedPostStyles.headline}>{headline}</h3>
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
)

export default RelatedPostsContentBlock

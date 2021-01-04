import React from 'react'
import { Link } from 'gatsby'
import relatedPostStyles from './related-posts-block.module.scss'

const RelatedPostsContentBlock = ({ headline, subtitle, references }) => (
  <aside className={relatedPostStyles.pullout}>
    <h3 className={relatedPostStyles.headline}>{headline}</h3>
    {subtitle && (
      <div
        className={relatedPostStyles.subtitle}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    )}
    <ul>
      {references.map(({ slug, title }) => (
        <li key={slug}>
          <Link to={`/analysis-updates/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </aside>
)

export default RelatedPostsContentBlock

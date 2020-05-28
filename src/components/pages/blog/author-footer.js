import React from 'react'
import AuthorFooterStyles from '~components/pages/blog/author-footer.module.scss'

export default ({ authors }) => {
  const footerAuthors = authors.filter(
    author => author.childContentfulAuthorBiographyTextNode !== null,
  ) // only keep authors with biographies

  return (
    <div className={AuthorFooterStyles.container}>
      {footerAuthors.map(author => (
        <div
          className={AuthorFooterStyles.authorFooter}
          key={`author-${author.name}`}
        >
          {author.headshot && (
            <img
              src={author.headshot.resize.src}
              alt={author.headshot.file.fileName}
            />
          )}
          <div className={AuthorFooterStyles.textContent}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  author.childContentfulAuthorBiographyTextNode
                    .childMarkdownRemark.html,
              }}
            />
            {author.twitterHandle && (
              <a href={`https://twitter.com/${author.twitterHandle}`}>
                @{author.twitterHandle}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

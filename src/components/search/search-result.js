import React from 'react'
import { Link } from 'gatsby'
import { FormatItemList } from '~components/utils/format'
import resultStyle from './search-result.module.scss'

const BlogAuthor = ({ author }) => {
  if (author.link) {
    return <a href={author.link}>{author.name}</a>
  }
  return <span>{author.name}</span>
}

const BlogAuthors = ({ authorsList }) => {
  const keys = authorsList.map(author => `author-${author.name}`)
  const items = authorsList.map(author => <BlogAuthor author={author} />)
  return (
    <p className={resultStyle.author}>
      By <FormatItemList items={items} keys={keys} />
    </p>
  )
}

const SearchResultAuthor = ({ authorsList, author, type }) => {
  if (type === 'Blog post' && authorsList.length > 0) {
    return <BlogAuthors authorsList={authorsList} />
  }
  if (author) {
    return <p className={resultStyle.author}>By {author}</p>
  }
  return <></>
}

const SearchResult = ({
  title,
  url,
  type,
  publishDate,
  author,
  allAuthors,
  children = false,
}) => {
  const authorsList = []
  if (type === 'Blog post') {
    const authors = author.split(', ')

    authors.forEach(a => {
      authorsList.push({ name: a, link: null })
    })

    // add links to the authorsList
    allAuthors.nodes.forEach(contentfulAuthor => {
      authorsList.forEach((postAuthor, paIndex) => {
        if (postAuthor.name === contentfulAuthor.name) {
          // use twitterLink by default
          authorsList[paIndex].link = contentfulAuthor.twitterLink
          if (contentfulAuthor.link) {
            // override twitterLink with link if there is a twitterLink
            authorsList[paIndex].link = contentfulAuthor.link // add the link
          }
        }
      })
    })
  }

  return (
    <div className={resultStyle.result}>
      <span className={resultStyle.type}>{type}</span>
      <h3 className={resultStyle.title}>
        <Link to={url}>{title}</Link>
      </h3>
      <div className={resultStyle.childrenContainer}>{children}</div>
      {(publishDate || author) && (
        <div className={resultStyle.resultDetails}>
          <SearchResultAuthor
            author={author}
            type={type}
            authorsList={authorsList}
          />
          {publishDate && (
            <p className={resultStyle.date}>
              {type === 'Blog post' ? 'Published' : 'Updated'} on {publishDate}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchResult

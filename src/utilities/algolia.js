import slugify from 'slugify'

export const prefixSearchIndex = index =>
  `${process.env.GATSBY_ALGOLIA_INDEX_PREFIX}${index}`

const stateQuery = `{
  states: allCovidStateInfo(
    filter: { name: { ne: null } }
  ) {
    edges {
      node {
        objectID: state
        name
        state
      }
    }
  }
}`

const blogPostQuery = `{
  posts: allContentfulBlogPost {
    edges {
      node {
        objectID: contentful_id
        title
        author {
          name
        }
        slug
        lede
        publishDate(formatString: "MMMM D, YYYY")
        body {
          body
        }
      }
    }
  }
}`

const pagesQuery = `{
  posts: allContentfulPage {
    edges {
      node {
        objectID: contentful_id
        title
        slug
        body {
          body
        }
      }
    }
  }
}`

function splitBodyIntoChunks(baseChunk, firstChunk, bodyChunks) {
  const chunks = [firstChunk]
  let currentChunkIndex = 0
  /* eslint-disable no-param-reassign */
  bodyChunks.reduce((splitChunks, chunk) => {
    if (
      splitChunks[currentChunkIndex].body.length === 0 ||
      splitChunks[currentChunkIndex].body.length + chunk.length < 5000
    ) {
      splitChunks[currentChunkIndex].body += chunk
      splitChunks[currentChunkIndex].body += '\n'
    } else {
      currentChunkIndex += 1
      splitChunks[currentChunkIndex] = {
        ...baseChunk,
        section: `section${currentChunkIndex}`,
        body: chunk,
      }
    }
    return splitChunks
  }, chunks)
  return chunks
  /* eslint-enable no-param-reassign */
}

function chunkPages(data) {
  return data.posts.edges.reduce((acc, { node }) => {
    const baseChunk = { ...node, body: '' }
    const firstChunk = { ...baseChunk, section: 'section0' }
    const bodyChunks = node.body.body.split('\n').filter(chunk => chunk !== '')

    return [...acc, ...splitBodyIntoChunks(baseChunk, firstChunk, bodyChunks)]
  }, [])
}

function chunkBlogPosts(data) {
  return data.posts.edges.reduce((acc, { node }) => {
    const baseChunk = { ...node, author_name: node.author.name, body: '' }
    delete baseChunk.author
    const firstChunk = { ...baseChunk, section: 'section0' }
    const bodyChunks = node.body.body.split('\n').filter(chunk => chunk !== '')

    return [...acc, ...splitBodyIntoChunks(baseChunk, firstChunk, bodyChunks)]
  }, [])
}

const stateSettings = {}
const pageSettings = {
  attributeForDistinct: 'section',
  distinct: true,
  attributesToSnippet: ['body:250'],
}
const blogPostSettings = {
  ...pageSettings,
}

export const queries = [
  {
    query: stateQuery,
    indexName: prefixSearchIndex('states'),
    transformer: ({ data }) =>
      data.states.edges.map(({ node }) => ({
        ...node,
        ...{
          slug: `/data/state/${slugify(node.name, {
            strict: true,
            lower: true,
          })}`,
        },
      })),
    settings: stateSettings,
  },
  {
    query: blogPostQuery,
    indexName: prefixSearchIndex('blog_posts'),
    transformer: ({ data }) => chunkBlogPosts(data),
    settings: blogPostSettings,
  },
  {
    query: pagesQuery,
    indexName: prefixSearchIndex('pages'),
    transformer: ({ data }) => chunkPages(data),
    settings: pageSettings,
  },
]

import slugify from 'slugify'

/**
 * Return a qualified Algolia index name
 * depending on the environment.
 *
 * @param string index
 *  The content type index identifier.
 */
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

/**
 * Split a node body into indexable chunks.
 * See https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/
 *  to get a better understanding of why we have to do this,
 *  and how we do this.
 *
 *
 * @param {*} baseChunk
 *  The base object that will be expanded and completed with chunks.
 * @param {*} firstChunk
 *  The first chunk, used to init the chunks array.
 * @param {*} bodyChunks
 *  Content of node.body split into chunks,
 *  so each content type can split the content accordingly.
 */
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

/**
 * Chunk a Page content type data into indexable chunks.
 *
 * @param array data
 *  The page data to be splitted into chunks for correct indexing.
 */
function chunkPages(data) {
  return data.posts.edges.reduce((acc, { node }) => {
    const baseChunk = { ...node, body: '' }
    const firstChunk = { ...baseChunk, section: 'section0' }
    const bodyChunks = node.body.body.split('\n').filter(chunk => chunk !== '')

    return [...acc, ...splitBodyIntoChunks(baseChunk, firstChunk, bodyChunks)]
  }, [])
}

/**
 * Chunk a Blog Post content type data into indexable chunks.
 *
 * @param array data
 *  The blog post data to be splitted into chunks for correct indexing.
 */
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

/**
 * Settings shared (for now) amidst Page & BlogPost content types
 * in order to handle chunks + handle Snippets
 * (see https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/how-to/highlighting-snippeting/)
 */
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
    indexName: prefixSearchIndex('state'),
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
    indexName: prefixSearchIndex('blogPost'),
    transformer: ({ data }) => chunkBlogPosts(data),
    settings: blogPostSettings,
  },
  {
    query: pagesQuery,
    indexName: prefixSearchIndex('page'),
    transformer: ({ data }) => chunkPages(data),
    settings: pageSettings,
  },
]

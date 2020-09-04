import marked from 'marked'

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
  states: allCovidState {
    edges {
      node {
        state
        dateModified(formatString: "MMMM D, YYYY")
      }
    }
  }
  statesInfo: allCovidStateInfo(
    filter: { name: { ne: null } }
  ) {
    edges {
      node {
        objectID: state
        name
        state
        notes
        childSlug {
          slug
        }
      }
    }
  }
}`

const blogPostQuery = `{
  posts: allContentfulBlogPost {
    edges {
      node {
        contentful_id
        title
        authors {
          name
        }
        slug
        lede {
          lede
        }
        updatedAt(formatString: "MMMM D, YYYY")
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
        contentful_id
        title
        slug
        updatedAt(formatString: "MMMM D, YYYY")
        body {
          body
        }
      }
    }
  }
}`

/**
 * Transform the State data, merging updatedAt & building slug.
 *
 * @param {*} data State data returned from queries.
 */
function transformStates(data) {
  // Map of { stateId: dateModified } to add to transformed result.
  const stateModifiedDates = data.states.edges.reduce(
    (acc, { node: { state, dateModified } }) => ({
      ...acc,
      [state]: dateModified,
    }),
    {},
  )
  return data.statesInfo.edges.map(({ node }) => ({
    ...node,
    updatedAt: stateModifiedDates[node.state],
    notes: node.notes ? marked(node.notes) : '',
    slug: `/data/state/${node.childSlug.slug}`,
  }))
}

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
    const bodyChunks = marked(node.body.body)
      .split('\n')
      .filter(chunk => chunk !== '')

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
    const authorName = []
    node.authors.forEach(author => {
      authorName.push(author.name)
    })

    const baseChunk = {
      title: node.title,
      body: '',
      author_name: authorName.join(', '),
      slug: node.slug,
      lede: node.lede.lede,
      updatedAt: node.updatedAt,
      section: node.section,
      contentful_id: node.contentful_id,
    }
    const firstChunk = { ...baseChunk, section: 'section0' }
    const bodyChunks = marked(node.body.body)
      .split('\n')
      .filter(chunk => chunk !== '')

    return [...acc, ...splitBodyIntoChunks(baseChunk, firstChunk, bodyChunks)]
  }, [])
}

const stateSettings = {
  attributesToSnippet: ['notes:50'],
}

/**
 * Settings shared (for now) amidst Page & BlogPost content types
 * in order to handle chunks + handle Snippets
 * (see https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/how-to/highlighting-snippeting/)
 */
const pageSettings = {
  attributeForDistinct: 'contentful_id',
  attributesToSnippet: ['body:50'],
}
const blogPostSettings = {
  ...pageSettings,
}

export const queries = [
  {
    query: stateQuery,
    indexName: prefixSearchIndex('state'),
    transformer: ({ data }) => transformStates(data),
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

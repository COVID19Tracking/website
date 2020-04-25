const slugify = require('slugify')

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

const settings = {}
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
    settings,
  },
  {
    query: blogPostQuery,
    indexName: prefixSearchIndex('blog_posts'),
    transformer: ({ data }) =>
      data.posts.edges.map(({ node }) => {
        const presented = { ...node }
        presented.author_name = node.author.name
        presented.body = node.body.body
        delete presented.author
        return presented
      }),
    settings,
  },
  {
    query: pagesQuery,
    indexName: prefixSearchIndex('pages'),
    transformer: ({ data }) =>
      data.posts.edges.map(({ node }) => {
        const presented = { ...node }
        presented.body = node.body.body
        return presented
      }),
    settings,
  },
]

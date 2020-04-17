const slugify = require('slugify')

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
const queries = [
  {
    query: stateQuery,
    indexName: `test_states`,
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
    transformer: ({ data }) =>
      data.posts.edges.map(({ node }) => {
        node.author_name = node.author.name
        node.body = node.body.body
        delete node.author
        return node
      }),
    indexName: `test_blog_posts`,
    settings,
  },
  {
    query: pagesQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node }) => {
        node.body = node.body.body
        return node
      }),
    indexName: `test_pages`,
    settings,
  },
]

module.exports = queries

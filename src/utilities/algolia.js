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
  posts: allContentfulBlogPost(sort: { fields: updatedAt }) {
    edges {
      node {
        title
        objectId: contentful_id
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
]

module.exports = queries

import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import RelatedPosts from '~components/pages/blog/related-posts'

describe('Components : Pages : Blog : Related Posts : Recent Posts', () => {
  it('renders correctly', () => {
    useStaticQuery.mockImplementation(() => ({
      allContentfulBlogPost: {
        nodes: [
          {
            slug: 'blogslug',
            publishDate: 'June 26, 2020',
            authors: [
              {
                name: 'Author',
                childContentfulAuthorBiographyTextNode: {
                  childMarkdownRemark: {
                    html: '<p>This is an author bio</p>',
                  },
                },
              },
            ],
            title: 'Post title',
            lede: {
              lede: 'La la blog lede',
            },
          },
          {
            slug: 'blog-slug-number-two',
            publishDate: 'June 25, 2020',
            authors: [
              {
                name: 'Edgar Allen Poe',
                childContentfulAuthorBiographyTextNode: {
                  childMarkdownRemark: {
                    html: '<p>Loves ravens.</p>',
                  },
                },
              },
              {
                name: 'Julia Child',
                childContentfulAuthorBiographyTextNode: {
                  childMarkdownRemark: {
                    html: '<p>Big cookbook fan.</p>',
                  },
                },
              },
            ],
            title: 'a blog post',
            lede: {
              lede: 'A strange combination of authors.',
            },
          },
        ],
      },
    }))
    const tree = renderer.create(<RelatedPosts blogPost={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Blog : Related Posts : Category Posts', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RelatedPosts
          blogPost={{
            contentfulBlogPost: {
              categories: [
                {
                  name: 'a cat',
                  slug: 'cat',
                  blog_post: [
                    {
                      slug: 'blogslug',
                      publishDate: 'June 26, 2020',
                      authors: [
                        {
                          name: 'Author',
                          childContentfulAuthorBiographyTextNode: {
                            childMarkdownRemark: {
                              html: '<p>This is an author bio</p>',
                            },
                          },
                        },
                      ],
                      title: 'Post title',
                      lede: {
                        lede: 'La la blog lede',
                      },
                    },
                    {
                      slug: 'blog-slug-number-two',
                      publishDate: 'June 25, 2020',
                      authors: [
                        {
                          name: 'Edgar Allen Poe',
                          childContentfulAuthorBiographyTextNode: {
                            childMarkdownRemark: {
                              html: '<p>Loves ravens.</p>',
                            },
                          },
                        },
                        {
                          name: 'Julia Child',
                          childContentfulAuthorBiographyTextNode: {
                            childMarkdownRemark: {
                              html: '<p>Big cookbook fan.</p>',
                            },
                          },
                        },
                      ],
                      title: 'a blog post',
                      lede: {
                        lede: 'A strange combination of authors.',
                      },
                    },
                  ],
                },
              ],
            },
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Pages : Blog : Related Posts : Explicit Related Posts', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RelatedPosts
          blogPost={{
            contentfulBlogPost: {
              relatedBlogPosts: [
                {
                  slug: 'blogslug',
                  publishDate: 'June 26, 2020',
                  authors: [
                    {
                      name: 'Author',
                      childContentfulAuthorBiographyTextNode: {
                        childMarkdownRemark: {
                          html: '<p>This is an author bio</p>',
                        },
                      },
                    },
                  ],
                  title: 'Post title',
                  lede: {
                    lede: 'La la blog lede',
                  },
                },
                {
                  slug: 'blog-slug-number-two',
                  publishDate: 'June 25, 2020',
                  authors: [
                    {
                      name: 'Edgar Allen Poe',
                      childContentfulAuthorBiographyTextNode: {
                        childMarkdownRemark: {
                          html: '<p>Loves ravens.</p>',
                        },
                      },
                    },
                    {
                      name: 'Julia Child',
                      childContentfulAuthorBiographyTextNode: {
                        childMarkdownRemark: {
                          html: '<p>Big cookbook fan.</p>',
                        },
                      },
                    },
                  ],
                  title: 'a blog post',
                  lede: {
                    lede: 'A strange combination of authors.',
                  },
                },
              ],
            },
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

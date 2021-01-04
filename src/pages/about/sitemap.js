import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'

const SitemapPage = ({ data }) => (
  <Layout title="Sitemap">
    <h2>Pages</h2>
    <ul>
      {data.navigationYaml.items.map(item => (
        <li>
          <Link to={item.link}>{item.title}</Link>
          {data.allContentfulNavigationGroup.nodes.find(
            subNavigation => subNavigation.slug === item.subNavigation,
          ) && (
            <ul>
              {data.allContentfulNavigationGroup.nodes
                .find(
                  subNavigation => subNavigation.slug === item.subNavigation,
                )
                .pages.map(subItem => (
                  <li>
                    <Link to={subItem.link}>{subItem.title}</Link>
                  </li>
                ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
    <h2>Analysis &amp; updates</h2>
    <ul>
      {data.allContentfulBlogPost.nodes.map(blog => (
        <li>
          {blog.publishDate}:{' '}
          <Link to={`/analysis-updates/${blog.slug}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
    <h2>Our data</h2>
    <ul>
      {data.allCovidStateInfo.nodes.map(state => (
        <li>
          <Link to={`/data/state/${state.childSlug.slug}`}>{state.name}</Link>
          <ul>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/cases`}>
                {state.name} Case history
              </Link>
            </li>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/tests-viral`}>
                {state.name} PCR test history
              </Link>
            </li>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/tests-antibody`}>
                {state.name} Antibody test history
              </Link>
            </li>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/hospitalization`}>
                {state.name} Hospitalization history
              </Link>
            </li>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/outcomes`}>
                {state.name} Outcome history
              </Link>
            </li>
            <li>
              <Link to={`/data/state/${state.childSlug.slug}/long-term-care`}>
                {state.name} Long-term care facilities
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  </Layout>
)

export default SitemapPage

export const query = graphql`
  query {
    navigationYaml(name: { eq: "header" }) {
      items {
        link
        title
        subNavigation
      }
    }
    allContentfulNavigationGroup {
      nodes {
        slug
        pages {
          title
          link: url
        }
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        state
        childSlug {
          slug
        }
        name
      }
    }
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      nodes {
        title
        publishDate(formatString: "MMMM d yyyy")
        slug
      }
    }
  }
`

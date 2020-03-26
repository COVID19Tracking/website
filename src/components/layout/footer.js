import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import '../../scss/components/footer.scss'

const FooterNavigation = ({ navigation }) => (
  <nav>
    <ul>
      {navigation.map(item => (
        <li key={item.link}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

const Footer = () => (
  <footer>
    <StaticQuery
      query={graphql`
        query {
          allNavigationYaml(filter: { name: { eq: "footer" } }) {
            edges {
              node {
                items {
                  link
                  title
                }
              }
            }
          }
        }
      `}
      render={data => (
        <FooterNavigation
          navigation={data.allNavigationYaml.edges[0].node.items}
        />
      )}
    />
    External links:
    <ul>
      <li>
        <a href="https://github.com/">GitHub</a>
      </li>
      <li>
        <a href="https://twitter.com/{{ data.twitter }}">Twitter</a>
      </li>
    </ul>
  </footer>
)

export default Footer

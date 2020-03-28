import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import NavigationContext from '../contexts/navigation'

const shortcodes = { Link }
const ContentPage = ({ pageContext }) => {
  const { isMdx, page, navigation } = pageContext
  const { frontmatter } = page
  return (
    <NavigationContext.Provider value={navigation}>
      <Layout noContainer={frontmatter.noContainer} title={frontmatter.title}>
        {isMdx ? (
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{page.body}</MDXRenderer>
          </MDXProvider>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        )}
      </Layout>
    </NavigationContext.Provider>
  )
}

export default ContentPage

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SubNavigation from '../components/common/sub-navigation'

const shortcodes = { Link }

const ContentPage = ({ pageContext }) => {
  const { isMdx, page, navigation } = pageContext
  const { frontmatter } = page
  return (
    <Layout noContainer={frontmatter.noContainer} title={frontmatter.title}>
      {navigation && navigation.length > 0 && (
        <SubNavigation navigation={navigation} />
      )}
      {isMdx ? (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{page.body}</MDXRenderer>
        </MDXProvider>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      )}
    </Layout>
  )
}

export default ContentPage

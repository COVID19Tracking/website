import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Footer from '../components/layout/footer'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'

const shortcodes = { Link }

const ContentPage = ({ pageContext }) => {
  const { isMdx, page } = pageContext
  const { frontmatter } = page
  return (
    <Layout>
      {frontmatter && (
        <>
          <SEO title={frontmatter.title} />
          <h1>{frontmatter.title}</h1>
        </>
      )}
      {isMdx ? (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{page.body}</MDXRenderer>
        </MDXProvider>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      )}
      <Footer />
    </Layout>
  )
}

export default ContentPage

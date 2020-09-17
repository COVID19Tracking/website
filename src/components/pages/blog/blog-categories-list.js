import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import blogCategoriesListStyles from './blog-categories-list.module.scss'

const BlogCategoriesList = () => {
  const { allContentfulBlogCategory } = useStaticQuery(graphql`
    query {
      allContentfulBlogCategory {
        nodes {
          name
          slug
          blog_post {
            id
          }
        }
      }
    }
  `)

  // put the categories with the most posts first
  const categories = allContentfulBlogCategory.nodes.sort((a, b) =>
    b.blog_post && a.blog_post ? b.blog_post.length - a.blog_post.length : 0,
  )

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={blogCategoriesListStyles.wrapper}>
      <TabletDisclosure className={blogCategoriesListStyles.container}>
        <TabletDisclosureHeader isOpen={isOpen} setIsOpen={setIsOpen}>
          <h3>Posts by Category</h3>
        </TabletDisclosureHeader>
        <TabletDisclosureContent isOpen={isOpen}>
          <ul
            role="navigation"
            aria-label="Categories"
            className={blogCategoriesListStyles.categoryList}
          >
            {categories.map(category => (
              <li
                className={blogCategoriesListStyles.category}
                key={category.slug}
              >
                <Link to={`/blog/category/${category.slug}`}>
                  <p className={blogCategoriesListStyles.categoryText}>
                    {category.name} (
                    {category.blog_post && category.blog_post.length})
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </TabletDisclosureContent>
      </TabletDisclosure>
    </div>
  )
}

export default BlogCategoriesList

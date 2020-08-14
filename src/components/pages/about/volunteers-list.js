import React from 'react'
import Container from '~components/common/container'
import volunteersListStyles from './volunteers-list.module.scss'

function fixWebsitePrefix(website) {
  if (!website.startsWith('http')) {
    // includes both http and https
    return `http://${website}`
  }
  return website
}
export default ({ items }) => (
  <>
    <ul className={volunteersListStyles.list}>
      {items.map(({ node }) => (
        <li key={`volunteer-${node.name}`}>
          {node.website ? (
            <a href={fixWebsitePrefix(node.website)}>{node.name}</a>
          ) : (
            <span>{node.name}</span>
          )}
        </li>
      ))}
    </ul>
    <Container centered>
      <p className={volunteersListStyles.note}>
        Are you a volunteer who wants to be added to this list? Edit your
        profile in Slack and scroll down to &quot;Volunteer web page.&quot;
      </p>
    </Container>
  </>
)

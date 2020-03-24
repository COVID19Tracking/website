import React from 'react'
import { Link } from 'gatsby'

const SecondaryNavigation = ({ navigation }) => (
  <ul className="secondary-navigation">
    {navigation.map(link => (
      <li>
        <Link to={link.url}>{link.title}</Link>
      </li>
    ))}
  </ul>
)

export default SecondaryNavigation

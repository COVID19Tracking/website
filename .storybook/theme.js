import { create } from '@storybook/theming/create'
import logo from '../src/images/project-logo-black.svg'
export default create({
  base: 'light',

  brandTitle: 'The COVID Tracking Project',
  brandUrl: 'http://covidtracking.com/',
  brandImage: logo,
})

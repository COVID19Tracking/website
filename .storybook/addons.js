import { addons } from '@storybook/addons'
import '@storybook/addon-info'
import theme from './theme'

addons.setConfig({
  theme: theme,
  showPanel: false,
})

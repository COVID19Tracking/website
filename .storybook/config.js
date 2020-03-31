import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import typography from '../src/utilities/typography'
import { addons } from '@storybook/addons'
import '../src/scss/global.scss'
import './style.css'
import theme from './theme'

addons.setConfig({
  theme: theme,
})

typography.injectStyles()

addDecorator(
  withInfo({
    inline: true,
  }),
)

global.__PATH_PREFIX__ = ''

window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

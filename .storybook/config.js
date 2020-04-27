import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addons } from '@storybook/addons'
import '../src/scss/global.scss'
import './style.css'
import theme from './theme'

addons.setConfig({
  theme: theme,
})

addDecorator(
  withInfo({
    inline: true,
  }),
)

global.__PATH_PREFIX__ = ''

window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

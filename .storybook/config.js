import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import typography from '../src/utilities/typography'
import '../src/scss/global.scss'
import './style.css'

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

import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

addDecorator(
  withInfo({
    inline: true,
  }),
)

global.__PATH_PREFIX__ = ''

window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

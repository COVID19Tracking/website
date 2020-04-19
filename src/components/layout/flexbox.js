/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Flex as OriginalFlex, Box as OriginalBox } from 'reflexbox'

const theme = {
  breakpoints: ['480px', '768px', '1024px', '1200px'],
}

const Flex = props => (
  <ThemeProvider theme={theme}>
    <OriginalFlex {...props}>{props.children}</OriginalFlex>
  </ThemeProvider>
)

const Box = props => (
  <ThemeProvider theme={theme}>
    <OriginalBox {...props}>{props.children}</OriginalBox>
  </ThemeProvider>
)

export { Flex, Box }

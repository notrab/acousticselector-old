import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import {ConnectedRouter} from 'react-router-redux'
import {ThemeProvider} from 'styled-components'

import store, {history} from './store'
import client from './store/apollo'
import theme from './utils/theme'
import App from './ui/App'

const target = document.querySelector('#root')

render(
  <ApolloProvider store={store} client={client}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </ApolloProvider>,
  target
)

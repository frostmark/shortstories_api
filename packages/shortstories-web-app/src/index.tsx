import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import App from 'pages'
import style from './style'

injectGlobal`${style}` // tslint:disable-line

const httpLink = createUploadLink({
  uri: '/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    credentials: 'same-origin',
  })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = ApolloLink.from([authLink, errorLink, httpLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

const AppWithHotLoader = hot(module)(AppWithApollo)

const root = document.getElementById('app')

ReactDOM.render(<AppWithHotLoader />, root)

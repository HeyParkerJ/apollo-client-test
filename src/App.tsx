import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  uri: 'foo',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <h1>Hi</h1>
  </ApolloProvider>
)


export default App
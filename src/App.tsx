import React from 'react'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'foo' }),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <h1>Hi</h1>
  </ApolloProvider>
)


export default App

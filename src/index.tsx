import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { render } from 'react-dom';

import App from './App';

const GRAPHQL_API_URL = 'https://graphql-pokemon.now.sh';

const client = new ApolloClient({
  uri: GRAPHQL_API_URL
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

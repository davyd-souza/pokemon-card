// DEPENDENCY
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  // uri: '',
  cache: new InMemoryCache(),
})

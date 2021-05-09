import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://www.leyviur.net/graphql",
  cache: new InMemoryCache(),
});

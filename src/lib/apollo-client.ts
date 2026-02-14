// src\lib\apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { schema } from '@/apollo/schema';
import merge from 'deepmerge';

let apolloClient: ApolloClient | null = null;

function createApolloClient(ssr = false) {
  const link = ssr
    ? new SchemaLink({ schema }) // برای SSR بدون درخواست HTTP
    : new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '/api/graphql',
        credentials: 'same-origin',
      });

  return new ApolloClient({
    ssrMode: ssr,
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            viewer: {
              merge: true,
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: any = null, ssr = false) {
  const _apolloClient = apolloClient ?? createApolloClient(ssr);

  if (initialState) {
    const existingCache = _apolloClient.extract() as Record<string, any>;
    const data = merge<Record<string, any>>(existingCache, initialState as Record<string, any>);
    _apolloClient.cache.restore(data);
  }

  if (ssr) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  return initializeApollo(initialState);
}

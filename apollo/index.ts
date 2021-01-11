import { ApolloClient, InMemoryCache } from "@apollo/client";
const url = "https://rickandmortyapi.com/graphql";

type Args = { page: number; filter: { name?: string; type?: string } };

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        locations: {
          keyArgs: ["id"],
          merge: actionMerge,
        },
        characters: {
          keyArgs: ["id"],
          merge: actionMerge,
        },
        episodes: {
          keyArgs: ["id"],
          merge: actionMerge,
        },
      },
    },
  },
});

function mergePagination(existing: any, incoming: any) {
  let merge =
    existing && Object.keys(existing).length > 1
      ? { ...incoming, results: [...existing.results, ...incoming.results] }
      : incoming;
  return merge;
}

function actionMerge(existing = {}, incoming: any, { args }: any) {
  let merge;
  const typeOrName = (args as Args).filter
    ? (args as Args).filter.name || (args as Args).filter.type
    : null;
  if ((args as Args).page > 1 && !typeOrName) {
    merge = mergePagination(existing, incoming);
  } else if ((args as Args).page === 1 && typeOrName) {
    merge = incoming;
  } else if ((args as Args).page === 1 && !typeOrName) {
    merge = incoming;
  } else {
    merge = mergePagination(existing, incoming);
  }
  return merge;
}

export const client = new ApolloClient({
  uri: url,
  cache,
});

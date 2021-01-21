import React from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import {
  Character,
  Info,
  Location,
  Episode,
  QueryCharactersArgs,
  QueryEpisodesArgs,
  QueryLocationsArgs,
} from "../graphql/types";
import getFilters from "../utils/getFilters";

interface FiltersVariables {
  page?: number;
  filter?: {
    name?: string;
    type?: string;
  };
}

type Data = {
  [key: string]: {
    info: Info;
    results: Character[] | Location[] | Episode[];
  };
};
export interface StateChange {
  search: string;
  filter?: string;
}

export default function useSearch(
  type: "characters" | "locations" | "episodes"
) {
  const [change, setChange] = React.useState<StateChange>({
    search: "",
    filter: "name",
  });
  const instance = new getFilters(type, change.search, change.filter, 1);
  const [query, setQuery] = React.useState<DocumentNode>(instance.handle());
  const [variables, setVariables] = React.useState<FiltersVariables | {}>(
    instance.variables()
  );
  const [fetching, setFetching] = React.useState(false);
  const { data, loading, fetchMore, refetch, error } = useQuery<
    any,
    QueryCharactersArgs | QueryEpisodesArgs | QueryLocationsArgs
  >(query, {
    variables,
    errorPolicy: "all",
  });

  const onSearchHandle = (key: string, value: string) => {
    setChange({ ...change, [key]: value });
    const queryInt = new getFilters(type, change.search, change.filter, 1);
    if ((change.search as string).length >= 3) {
      setQuery(queryInt.handle());
      setVariables(queryInt.variables());
      searchItems();
    }
  };

  const searchItems = () => {
    setFetching(true);
  };

  const resetAll = () => {
    setChange({ search: "", filter: "name" });
    setVariables(new getFilters(type, "", change.filter, 1).variables());
    setFetching(true);
  };
  const onRefresh = () => {
    if (refetch) {
      refetch({ page: 1 });
    }
  };

  const loadMore = () => {
    if (!loading) {
      const nextPage = (data as Data)[type].info.next;
      if (!nextPage) {
        return;
      }
      if (fetchMore) {
        return fetchMore({
          query,
          variables: {
            filter: (variables as FiltersVariables).filter,
            page: (data as Data)[type].info.next,
          },
        });
      }
    }
  };

  React.useEffect(() => {
    if (fetching) {
      if (refetch) {
        refetch(variables);
        setFetching(false);
        return;
      }
    }
  }, [fetching, loading, data, change]);

  return {
    onSearchHandle,
    change,
    loadMore,
    resetAll,
    data,
    loading,
    onRefresh,
    error,
  };
}

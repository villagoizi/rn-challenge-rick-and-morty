import React from "react";
import { useLazyQuery, DocumentNode } from "@apollo/client";
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
  filter: {
    name?: string;
    type?: string;
  };
  page: number | null;
}

type Data = {
  [key: string]: {
    info: Info;
    results: Character[] | Location[] | Episode[];
  };
};

export default function useSearch(
  search = "",
  filter = "name",
  type: "characters" | "locations" | "episodes"
) {
  const [query, setQuery] = React.useState<DocumentNode>(
    new getFilters(type, search, filter, 1).handle()
  );
  const [items, setItems] = React.useState<Data | {}>({});
  const [reset, setReset] = React.useState(false);
  const [variables, setVariables] = React.useState<FiltersVariables | {}>({});
  const [fetching, setFetching] = React.useState(true);
  const [getData, { data, loading, fetchMore, refetch }] = useLazyQuery<
    any,
    QueryCharactersArgs | QueryEpisodesArgs | QueryLocationsArgs
  >(query, {
    variables,
  });

  React.useEffect(() => {
    if (fetching) {
      getData({ variables });
      console.log("searching");
      setFetching(false);
    } else {
      setFetching(false);
    }
    if ((data && !loading) || (!data && !loading)) {
      setItems(data);
    }
  }, [search, filter, type, fetching, data]);

  React.useEffect(() => {
    if (reset) {
      setItems({});
      onRefresh();
      setReset(false);
    }
  }, [reset]);

  const searchItems = () => {
    const instance = new getFilters(type, search, filter, 1);
    setQuery(instance.handle());
    setVariables(instance.variables());
    setFetching(true);
  };
  const loadMore = () => {
    if (!loading) {
      const nextPage = (items as Data)[type].info.next;
      if (!nextPage) {
        return;
      }
      console.log("fetch more...");

      if (fetchMore) {
        return fetchMore({
          query,
          variables: {
            filter: (variables as FiltersVariables).filter,
            page: (items as Data)[type].info.next,
          },
        });
      }
    }
  };

  const onRefresh = () => {
    if (refetch) {
      refetch({ page: 1 });
    }
  };

  return {
    items,
    loading,
    searchItems,
    setReset,
    loadMore,
    onRefresh,
  };
}

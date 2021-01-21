import React from "react";
import { ApolloQueryResult } from "@apollo/client";
import Header from "../components/Header";
import Spinner from "../components/ui/Spinner";
import ErrorMsg from "../components/ui/ErrorMsg";
import useQuerySearch, { SwitchTypes } from "../hook/useQuerySearch";

export interface ScreenProps<T> {
  loadMore: () => Promise<ApolloQueryResult<unknown>> | undefined;
  data: T;
  loading: boolean;
  onRefresh: () => void;
}

export const withHandleQuery = <P extends object>(
  Component: React.ComponentType<P>,
  getFilter: () => SwitchTypes
) => {
  const Render = () => {
    const {
      onSearchHandle,
      change,
      loadMore,
      resetAll,
      data,
      loading,
      onRefresh,
      error,
    } = useQuerySearch(getFilter());
    let props = {
      onRefresh,
      loadMore,
      data,
      loading,
    };
    let RenderComponent = <Spinner />;

    if (!loading && data) {
      RenderComponent = <Component {...(props as P)} />;
    }

    if (!loading && error) {
      RenderComponent = (
        <ErrorMsg msg="Ops! There is no match with their search" />
      );
    }
    return (
      <>
        <Header
          change={change}
          onSearchHandle={onSearchHandle}
          resetAll={resetAll}
        />
        {RenderComponent}
      </>
    );
  };
  return Render;
};

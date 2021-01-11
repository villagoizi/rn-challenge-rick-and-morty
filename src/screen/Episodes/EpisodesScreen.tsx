import React from "react";
import { Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import AnotherCard from "../../ui/AnotherCard";
import Colors from "../../constants/Colors";
import { Info, Episode } from "../../graphql/types";
import Center from "../../ui/CenterBox";
import { PropsRoot } from "../../navigation/types";

import useQuerySearch from "../../hook/useQuerySearch";
import Header from "../../components/Header";

interface EpisodesScreenProps {}

type Data = {
  episodes: {
    info: Info;
    results: Episode[];
  };
};

export default function EpisodesScreen(props: EpisodesScreenProps) {
  const {
    onSearchHandle,
    change,
    loadMore,
    resetAll,
    data,
    loading,
    onRefresh,
    error,
  } = useQuerySearch("episodes");

  const renderItem = ({ item }: { item: Episode }) => (
    <AnotherCard
      episode={item.episode as string}
      name={item.name as string}
      id={item.id as string}
      onPress={() =>
        (props as PropsRoot<"AnotherModal"> &
          PropsRoot<"MainStack">).navigation.navigate("AnotherModal", {
          id: item.id as string,
          filter: "episode",
        })
      }
    />
  );

  return (
    <>
      <Header
        change={change}
        onSearchHandle={onSearchHandle}
        resetAll={resetAll}
      />
      {loading && !data && (
        <Center>
          <ActivityIndicator size="large" color={Colors.primary} />
        </Center>
      )}
      {!loading && data && (data as Data).episodes ? (
        <FlatList
          data={(data as Data).episodes.results}
          renderItem={renderItem}
          keyExtractor={(item: Episode, i) =>
            (item.id as string) || i.toString()
          }
          contentContainerStyle={styles.listGrid}
          onEndReached={() => loadMore()}
          refreshing={loading}
          onRefresh={() => onRefresh()}
          onEndReachedThreshold={0.5}
        />
      ) : (error as any) ? (
        <Center>
          {error?.graphQLErrors.map(({ message }, i) => (
            <Text style={styles.msg} key={i}>
              Ops! There is no match with their search
            </Text>
          ))}
        </Center>
      ) : (
        <Center>
          <Text style={styles.msg}>Write to search...</Text>
        </Center>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  listGrid: {
    marginHorizontal: "2.5%",
  },
  msg: {
    color: "#a1a1a1",
  },
});

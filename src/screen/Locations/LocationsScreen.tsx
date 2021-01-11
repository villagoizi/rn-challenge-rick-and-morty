import React from "react";
import { Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { Info, Location } from "../../graphql/types";
import Center from "../../ui/CenterBox";
import { PropsRoot } from "../../navigation/types";
import useQuerySearch from "../../hook/useQuerySearch";
import Header from "../../components/Header";
import ListLocation from "../../components/ListLocation";

interface LocationsScreenProps extends PropsRoot<"MainStack"> {}

type Data = {
  locations: {
    info: Info;
    results: Location[];
  };
};

export default function LocationsScreen(props: LocationsScreenProps) {
  const {
    onSearchHandle,
    change,
    loadMore,
    resetAll,
    data,
    loading,
    onRefresh,
    error,
  } = useQuerySearch("locations");

  const renderItem = ({ item }: { item: Location }) => (
    <ListLocation
      item={item}
      onPress={() =>
        (props as PropsRoot<"AnotherModal"> &
          PropsRoot<"MainStack">).navigation.navigate("AnotherModal", {
          id: item.id as string,
          filter: "location",
        })
      }
    />
  );
  const keyExtractor = React.useCallback(
    (item: Location, i) => (item.id as string) || i.toString(),
    []
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
      {!loading && data && (data as Data).locations ? (
        <FlatList
          data={(data as Data).locations.results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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

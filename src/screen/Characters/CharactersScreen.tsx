import React from "react";
import { Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Card from "../../ui/Card";
import Colors from "../../constants/Colors";
import { Character, Info } from "../../graphql/types";
import { PropsRoot } from "../../navigation/types";
import Center from "../../ui/CenterBox";
import useQuerySearch from "../../hook/useQuerySearch";
import Header from "../../components/Header";

interface CharactersScreenProps extends PropsRoot<"MainStack"> {}

type Data = {
  characters: {
    info: Info;
    results: Character[];
  };
};

export default function CharactersScreen(props: CharactersScreenProps) {
  const {
    onSearchHandle,
    change,
    loadMore,
    resetAll,
    data,
    loading,
    onRefresh,
    error,
  } = useQuerySearch("characters");

  const renderItem = ({ item }: { item: Character }) => {
    return (
      <Card
        name={item.name}
        image={item.image as string | undefined}
        onPress={() =>
          (props as PropsRoot<"CharacterModal"> &
            PropsRoot<"MainStack">).navigation.navigate("CharacterModal", {
            id: item.id as string,
          })
        }
      />
    );
  };

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
      {!loading && data && (data as Data).characters ? (
        <FlatList
          data={(data as Data).characters?.results}
          renderItem={renderItem}
          keyExtractor={(item, i) => item.id || i.toString()}
          contentContainerStyle={styles.listGrid}
          onEndReached={() => loadMore()}
          refreshing={loading}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.5}
        />
      ) : (error as any) ? (
        <Center>
          {error?.graphQLErrors.map(({ message }: any, i: number) => (
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

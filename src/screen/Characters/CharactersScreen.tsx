import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/ui/Card";
import { Character } from "../../graphql/types";
import { PropsRoot } from "../../navigation/types";
import { Data } from "../../hook/useQuerySearch";
import { withHandleQuery, ScreenProps } from "../../hocs/withHandleQuery";

function CharactersScreen(props: ScreenProps<Data<Character>>) {
  let { data, loadMore, loading, onRefresh } = props;
  const history = useNavigation<PropsRoot<"CharacterModal">["navigation"]>();
  const renderItem = ({ item }: { item: Character }) => (
    <Card
      name={item.name}
      image={item.image as string | undefined}
      onPress={() =>
        history.navigate("CharacterModal", {
          id: item.id as string,
        })
      }
    />
  );
  return (
    <>
      <FlatList
        data={(data as Data<Character>).characters?.results}
        renderItem={renderItem}
        keyExtractor={(item: Character, i) => item.id as string}
        contentContainerStyle={styles.listGrid}
        onEndReached={() => loadMore()}
        refreshing={loading}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.5}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listGrid: {
    marginHorizontal: "2.5%",
  },
});

export default withHandleQuery(CharactersScreen, () => "characters");

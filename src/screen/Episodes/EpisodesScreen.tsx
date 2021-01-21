import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnotherCard from "../../components/ui/AnotherCard";
import { Episode } from "../../graphql/types";
import { PropsRoot } from "../../navigation/types";
import { Data } from "../../hook/useQuerySearch";
import { ScreenProps, withHandleQuery } from "../../hocs/withHandleQuery";

function EpisodesScreen(props: ScreenProps<Data<Episode>>) {
  const history = useNavigation<PropsRoot<"AnotherModal">["navigation"]>();
  const { onRefresh, loading, loadMore, data } = props;

  const renderItem = ({ item }: { item: Episode }) => (
    <AnotherCard
      episode={item.episode as string}
      name={item.name as string}
      id={item.id as string}
      onPress={() =>
        history.navigate("AnotherModal", {
          id: item.id as string,
          filter: "episode",
        })
      }
    />
  );

  return (
    <FlatList
      data={(data as Data<Episode>).episodes.results}
      renderItem={renderItem}
      keyExtractor={(item: Episode, i) => item.id as string}
      contentContainerStyle={styles.listGrid}
      onEndReached={() => loadMore()}
      refreshing={loading}
      onRefresh={() => onRefresh()}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  listGrid: {
    marginHorizontal: "2.5%",
  },
});

export default withHandleQuery(EpisodesScreen, () => "episodes");

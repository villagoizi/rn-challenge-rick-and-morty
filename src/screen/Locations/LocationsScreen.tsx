import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Location } from "../../graphql/types";
import { PropsRoot } from "../../navigation/types";
import { Data } from "../../hook/useQuerySearch";
import ListLocation from "../../components/ListLocation";
import { ScreenProps, withHandleQuery } from "../../hocs/withHandleQuery";

function LocationsScreen(props: ScreenProps<Data<Location>>) {
  const history = useNavigation<PropsRoot<"AnotherModal">["navigation"]>();
  const { onRefresh, loading, loadMore, data } = props;

  const renderItem = ({ item }: { item: Location }) => (
    <ListLocation
      item={item}
      onPress={() =>
        history.navigate("AnotherModal", {
          id: item.id as string,
          filter: "location",
        })
      }
    />
  );
  const keyExtractor = React.useCallback(
    (item: Location, i) => item.id as string,
    []
  );
  return (
    <FlatList
      data={(data as Data<Location>).locations.results}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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

export default withHandleQuery(LocationsScreen, () => "locations");

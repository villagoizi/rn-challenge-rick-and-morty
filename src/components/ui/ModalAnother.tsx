import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Location, Episode, Character } from "../../graphql/types";
import Colors from "../../constants/Colors";
import CustomButton from "./CustomButton";
import Card from "./Card";
import { FlatList } from "react-native-gesture-handler";

interface ModalAnotherProps {
  data: any | undefined;
  onPress?: () => void;
  filter: "location" | "episode";
}

export default function ModalAnother({
  data,
  onPress,
  filter,
}: ModalAnotherProps) {
  const renderItems = ({ item }: { item: Character }) => (
    <Card id={item.id} name={item.name} image={item.image as string} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      {filter === "location" && data ? (
        <>
          <Text style={styles.title}>{(data as Location).type}</Text>
          <View style={styles.description}>
            <Text style={styles.dataTitle}>Type: </Text>
            <Text style={styles.dataDesc}>
              {(data as Location).type
                ? (data as Location).type
                : "Type unknown"}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.dataTitle}>Dimension: </Text>
            <Text style={styles.dataDesc}>
              {(data as Location).dimension
                ? (data as Location).dimension
                : "Dimension unknown"}
            </Text>
          </View>
          <View style={styles.chrCont}>
            <Text style={styles.dataTitle}>Residents: </Text>
            <FlatList
              data={data.residents?.slice().splice(0, 5) as Character[]}
              keyExtractor={(item: Character) => item.id as string}
              renderItem={renderItems}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{(data as Episode).name}</Text>
          <View style={styles.description}>
            <Text style={styles.dataTitle}>Release date: </Text>
            <Text style={styles.dataDesc}>
              {(data as Episode).air_date
                ? (data as Episode).air_date
                : "Release date unknown"}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.dataTitle}>Episode: </Text>
            <Text style={styles.dataDesc}>
              {(data as Episode).episode
                ? (data as Episode).episode
                : "Episode unknown"}
            </Text>
          </View>
          <View style={styles.chrCont}>
            <Text style={styles.dataTitle}>Characters: </Text>
            <FlatList
              data={data.characters?.slice().splice(0, 5) as Character[]}
              keyExtractor={(item: Character) => item.id as string}
              renderItem={renderItems}
            />
          </View>
        </>
      )}

      <View style={styles.btnClose}>
        <CustomButton onPress={onPress}>Close modal</CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: "2.5%",
  },
  header: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
  },
  img: { width: "100%", height: "100%" },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Jockey",
    textTransform: "uppercase",
    fontSize: 18,
    paddingVertical: 10,
  },
  description: {
    flexDirection: "row",
  },
  dataTitle: {
    fontWeight: "bold",
    fontFamily: "OpenSans",
    fontSize: 14,
  },
  dataDesc: {
    fontSize: 14,
    fontFamily: "OpenSans",
  },
  btnClose: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "2.5%",
  },
  chrCont: {},
});

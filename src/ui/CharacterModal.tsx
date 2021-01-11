import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Character } from "../graphql/types";
import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";

interface CharacterModalProps {
  character: Character | undefined;
  onPress?: () => void;
}

export default function CharacterModal({
  character,
  onPress,
}: CharacterModalProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: character?.image || undefined }}
        />
      </View>
      <Text style={styles.title}>{character?.name}</Text>
      <View style={styles.description}>
        <Text style={styles.dataTitle}>Type: </Text>
        <Text style={styles.dataDesc}>
          {character?.type ? character.type : "Type unknown"}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.dataTitle}>Gender: </Text>
        <Text style={styles.dataDesc}>
          {character?.gender ? character.gender : "Gender unknown"}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.dataTitle}>Species: </Text>
        <Text style={styles.dataDesc}>
          {character?.species ? character.species : "Type unknown"}
        </Text>
      </View>
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
    marginTop: 18,
  },
  img: { width: "100%", height: "100%" },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Jockey",
    textTransform: "uppercase",
    fontSize: 18,
    paddingVertical: 5,
  },
  description: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  dataTitle: {
    fontWeight: "bold",
    fontFamily: "OpenSans",
    fontSize: 16,
  },
  dataDesc: {
    fontSize: 16,
    fontFamily: "OpenSans",
  },
  btnClose: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "2.5%",
  },
});

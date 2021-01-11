import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

interface CardProps {
  onPress?: () => void;
  image?: string | undefined;
  name?: string | null;
  id?: string | null;
  styleTouch?: StyleProp<ViewStyle>;
  dimension?: string;
  episode?: string;
}

export default function Card(props: CardProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.screen, props.styleTouch]}
    >
      <View style={styles.header}>
        <Image source={{ uri: props.image }} style={styles.img} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: 50,
    width: Dimensions.get("window").width < 500 ? "100%" : "45%",
    flexDirection: "row",
    backgroundColor: Colors.primary,
    marginVertical: 6,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowRadius: 6,
    shadowOffset: { height: 0, width: 2 },
    shadowColor: Colors.primary,
    elevation: 2,
  },
  header: {
    width: 50,
    height: 50,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.accent,
    fontFamily: "Jockey",
    fontWeight: "bold",
  },
});

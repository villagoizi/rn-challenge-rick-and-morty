import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

interface CardProps {
  onPress?: () => void;
  name: string;
  id: string;
  styleTouch?: StyleProp<ViewStyle>;
  dimension?: string;
  episode?: string;
}

export default function Card(props: CardProps) {
  return (
    <TouchableOpacity
      style={[styles.screen, props.styleTouch]}
      onPress={props.onPress}
    >
      <Text style={styles.header}>{props.name}</Text>
      <View style={styles.body}>
        <Text style={styles.text}>{props.dimension || props.episode}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 100,
    width: Dimensions.get("window").width < 500 ? "100%" : "45%",
    backgroundColor: Colors.primary,
    marginVertical: 6,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowRadius: 6,
    shadowOffset: { height: 0, width: 2 },
    shadowColor: Colors.primary,
    elevation: 1,
  },
  header: {
    fontFamily: "Jockey",
    fontWeight: "bold",
    padding: 10,
    fontSize: 18,
    backgroundColor: "white",
    color: Colors.accent,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "BreeSerif",
    color: Colors.accent,
  },
});

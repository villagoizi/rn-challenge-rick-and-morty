import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

interface CustomRadioInputProps {
  onPress: () => void;
  label?: string;
  checked: boolean;
}

export default function CustomRadioInput(props: CustomRadioInputProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      {props.checked ? (
        <View style={styles.screen}>
          <View style={[styles.circle, styles.checkedCircle]} />
          <Text style={styles.label}>{props.label}</Text>
        </View>
      ) : (
        <View style={styles.screen}>
          <View style={[styles.circle]} />
          <Text style={styles.label}>{props.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderColor: Colors.primary,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 12,
  },
});

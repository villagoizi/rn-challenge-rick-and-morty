import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/Colors";

interface CustomInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
}

export default function CustomInput(props: CustomInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "2.5%",
    minWidth: "60%",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
});

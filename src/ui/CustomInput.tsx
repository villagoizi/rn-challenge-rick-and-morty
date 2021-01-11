import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import Colors from "../constants/Colors";

interface CustomInputProps {
  styleCtn?: StyleProp<ViewStyle>;
  styleInp?: StyleProp<TextStyle>;
  propsInp?: TextInputProps;
}

export default function CustomInput(props: CustomInputProps) {
  return (
    <View style={[styles.container, props.styleCtn]}>
      <TextInput
        style={[styles.input, props.propsInp?.style]}
        {...props.propsInp}
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

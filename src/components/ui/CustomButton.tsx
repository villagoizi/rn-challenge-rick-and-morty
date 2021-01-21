import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import Colors from "../../constants/Colors";

interface CustomButtonProps {
  children: React.ReactNode;
  styleContainer?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function CustomButton({
  children,
  styleContainer,
  styleText,
  onPress,
}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.screen, styleContainer]}>
      <Text style={[styles.text, styleText]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    minWidth: Dimensions.get("window").width / 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Jockey",
    fontSize: 14,
  },
});

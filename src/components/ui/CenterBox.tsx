import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CenterBoxProps {
  children: React.ReactNode;
}

export default function CenterBox({ children }: CenterBoxProps) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "2.5%",
  },
});

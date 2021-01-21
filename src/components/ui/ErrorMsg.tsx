import React from "react";
import { StyleSheet, Text } from "react-native";
import CenterBox from "./CenterBox";

const ErrorMsg: React.FC<{ msg: string }> = ({ msg }) => (
  <CenterBox>
    <Text style={styles.msg}>{msg}</Text>
  </CenterBox>
);

const styles = StyleSheet.create({
  msg: {
    color: "#a1a1a1",
  },
});

export default ErrorMsg;

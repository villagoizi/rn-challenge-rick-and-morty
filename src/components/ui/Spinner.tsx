import React from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import CenterBox from "./CenterBox";

const Spinner = () => (
  <CenterBox>
    <ActivityIndicator size="large" color={Colors.primary} />
  </CenterBox>
);

export default Spinner;

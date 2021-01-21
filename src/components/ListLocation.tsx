import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnotherCard from "./ui/AnotherCard";
import { Location } from "../graphql/types";

interface ListLocationProps {
  item: Location;
  onPress: () => void;
}

export default function ListLocation({ item, onPress }: ListLocationProps) {
  const itemList = React.useMemo(() => item, [item]);

  return (
    <AnotherCard
      dimension={itemList.dimension as string}
      name={itemList.name as string}
      id={itemList.id as string}
      onPress={onPress}
    />
  );
}

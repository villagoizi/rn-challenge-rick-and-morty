import React from "react";
import { View, TouchableOpacity, Keyboard, StyleSheet } from "react-native";
import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import CustomRadioInput from "../ui/CustomRadioInput";
import { StateChange } from "../hook/useQuerySearch";
import Colors from "../constants/Colors";

interface HeaderProps {
  change: StateChange;
  onSearchHandle: (key: string, value: string) => void;
  resetAll: () => void;
}

export default function Header({
  change,
  onSearchHandle,
  resetAll,
}: HeaderProps) {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <TouchableOpacity activeOpacity={0.2} onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <CustomInput
          placeholder="Write to search..."
          onChangeText={(text: string) => {
            onSearchHandle("search", text);
            if ((change.search as string).length > 0) {
              setDisabled(false);
            }
          }}
          value={change.search}
        />
        <CustomButton
          styleText={{ color: "white" }}
          styleContainer={{
            backgroundColor: disabled ? "grey" : Colors.secondary,
            paddingVertical: 5,
            marginVertical: "2.5%",
          }}
          onPress={() => (disabled ? null : resetAll())}
        >
          Clear
        </CustomButton>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CustomRadioInput
          checked={change.filter === "name"}
          label="Name"
          onPress={() => onSearchHandle("filter", "name")}
        />
        <CustomRadioInput
          checked={change.filter === "type"}
          label="Type"
          onPress={() => onSearchHandle("filter", "type")}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/ui/CustomButton";
import { PropsMain } from "../../navigation/types";

interface HomeScreenProps extends PropsMain<"Home"> {}

export default function HomeScreen(props: HomeScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Challenge</Text>
        <Text style={styles.author}>Ivan Contreras Villagoiz</Text>
      </View>
      <View style={styles.footer}>
        <CustomButton
          onPress={() => {
            props.navigation.navigate("Filter");
            console.log("Is work");
          }}
          styleText={{ color: "white" }}
        >
          ENTER
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Jockey",
    fontSize: 28,
    color: Colors.accent,
  },
  author: {
    fontFamily: "OpenSans",
    fontSize: 20,
    color: Colors.accent,
  },
  footer: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
});

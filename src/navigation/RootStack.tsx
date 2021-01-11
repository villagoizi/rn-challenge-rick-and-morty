import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import CharacterModal from "../screen/Modal/CharactersModal";
import AnotherModal from "../screen/Modal/AnotherModal";
import { RootStackParamList } from "./ParamList/RootStackParamList";

const RootStack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="MainStack"
        mode="modal"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          name="MainStack"
          options={{ headerShown: false }}
          component={MainStack}
        />
        <RootStack.Screen name="CharacterModal" component={CharacterModal} />
        <RootStack.Screen name="AnotherModal" component={AnotherModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

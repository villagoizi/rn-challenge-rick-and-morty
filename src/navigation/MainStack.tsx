import React from "react";
import BottomTabs from "./BottomTab";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/Home/HomeScreen";
import { MainStackParamList } from "./ParamList/MainStackParamList";
import Colors from "../constants/Colors";

const MainStack = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <MainStack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.secondary },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "BreeSerif",
            color: "white",
            fontSize: 18,
          },
        }}
        name="Filter"
        component={BottomTabs}
      />
    </MainStack.Navigator>
  );
}

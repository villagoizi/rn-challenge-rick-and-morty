import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharactersScreen from "../screen/Characters/CharactersScreen";
import LocationsScreen from "../screen/Locations/LocationsScreen";
import EpisodesScreen from "../screen/Episodes/EpisodesScreen";
import { BottomTabParamList } from "./ParamList/BottomTabParamList";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";

const TabStack = createBottomTabNavigator<BottomTabParamList>();

function getHeaderTitle(route: any) {
  const routname = getFocusedRouteNameFromRoute(route) ?? "Characters";
  switch (routname) {
    case "Locations":
      return "Locations";
    case "Episodes":
      return "Episodes";
    default:
      return "Characters";
  }
}

export default function TabBottomFilter({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);
  return (
    <TabStack.Navigator
      tabBarOptions={{
        activeTintColor: Colors.secondary,
        inactiveTintColor: "gray",
        style: { justifyContent: "center" },
        labelPosition: "beside-icon",
        labelStyle: { fontFamily: "Jockey", fontSize: 16 },
      }}
      initialRouteName="Characters"
    >
      <TabStack.Screen name="Characters" component={CharactersScreen} />
      <TabStack.Screen name="Locations" component={LocationsScreen} />
      <TabStack.Screen name="Episodes" component={EpisodesScreen} />
    </TabStack.Navigator>
  );
}

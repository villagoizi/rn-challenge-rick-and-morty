import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { client } from "./apollo";
import { ApolloProvider } from "@apollo/client";
// import Home from "./src/screen/Home/HomeScreen";
// import Character from "./src/screen/Characters/CharactersScreen";
// import Locations from "./src/screen/Locations/LocationsScreen";
// import Episodes from "./src/screen/Episodes/EpisodesScreen";
import Routes from "./src/navigation/RootStack";

const App = () => {
  const [loadingFonts] = useFonts({
    BreeSerif: require("./assets/fonts/BreeSerif-Regular.ttf"),
    Jockey: require("./assets/fonts/JockeyOne-Regular.ttf"),
    OpenSans: require("./assets/fonts/OpenSans-Light.ttf"),
  });
  if (!loadingFonts) {
    return <AppLoading />;
  }
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;

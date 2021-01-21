import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { client } from "./apollo";
import { ApolloProvider } from "@apollo/client";
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

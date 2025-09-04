import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

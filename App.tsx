import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ProdutoView } from "./src/view/ProdutoView";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ProdutoView />
      <StatusBar style="auto"  />
    </View>
  );
}

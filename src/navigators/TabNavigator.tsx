import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./BottomTabParamList";
import { CadastroProdutoView } from "../view/CadastroProdutoView";
import ProdutosView from "../view/ProdutosView";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons/";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cadastro"
        component={CadastroProdutoView}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="cash-register" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={ProdutosView}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="list-alt" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

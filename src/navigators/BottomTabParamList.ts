import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type BottomTabParamList = {
  Cadastro: { cadastro: boolean } | undefined;
  Produtos: undefined;
};

type BottomTabProps = BottomTabNavigationProp<BottomTabParamList>;


export { BottomTabParamList, BottomTabProps };

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ProdutoData } from "../model/Produto";

type BottomTabParamList = {
  Cadastro: { cadastro: boolean, updateProduto? : ProdutoData } | undefined;
  Produtos: undefined;
  'Configurações' : undefined;
};

type BottomTabProps = BottomTabNavigationProp<BottomTabParamList>;


export { BottomTabParamList, BottomTabProps };

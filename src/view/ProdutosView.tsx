import { ActivityIndicator, Button, FlatList, View } from "react-native";
import { useProduto } from "../control/ProdutoController";
import SingleProduto from "../components/SingleProduto";

export default function ProdutosView() {
  const { listaProdutos, findAllProdutos, loading } = useProduto();
  const produtosArray = Object.entries(listaProdutos).map(([key, produto]) => ({
    key,
    ...produto,
  }));
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={produtosArray}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => SingleProduto(item)}
      />
      {loading && <ActivityIndicator size="large" />}
      <Button title="Achar produtos" onPress={findAllProdutos} />
    </View>
  );
}

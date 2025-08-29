import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { useProduto } from "../control/ProdutoController";
import SingleProduto from "../components/SingleProduto/index";
import { useCallback, useMemo } from "react";
import { ProdutoData } from "../model/Produto";

export default function ProdutosView() {
  const {
    listaProdutos,
    loading,
    viewMessage,
    success,
    error,
    findAllProdutos,
    apagarProduto,
    formatPrice,
  } = useProduto();

  const renderItem = useCallback(
    ({ item }: { item: ProdutoData }) => {
      return (
        <SingleProduto
          {...item}
          onDelete={apagarProduto}
          formatPrice={formatPrice}
        />
      );
    },
    [apagarProduto, formatPrice]
  );

  const isError = () => {
    if (success) return true;
    if (error) return false;
  }

 
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listaProdutos}
        keyExtractor={(item) => item.referenceKey}
        renderItem={renderItem}
        extraData={listaProdutos}
        removeClippedSubviews={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={undefined}
      />
      {loading && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={{ marginTop: 10, color: "#666" }}>
            Carregando produtos...
          </Text>
        </View>
      )}
      {viewMessage && (
        <View
          style={{
            padding: 15,
            backgroundColor: isError() ? "#d4edda" : "#f8d7da",
            margin: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: isError() ? "#155724" : "#721c24",
              textAlign: "center",
            }}
          >
            {viewMessage}
          </Text>
        </View>
      )}
      <View style={{ padding: 10 }}>
        <Button
          title="Recarregar produtos"
          onPress={findAllProdutos}
          color="#3498db"
        />
      </View>
    </View>
  );
}

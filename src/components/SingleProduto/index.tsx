import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./styles";
import { ProdutoData } from "../../model/Produto";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BottomTabProps } from "../../navigators/BottomTabParamList";

interface SingleProdutoProps extends ProdutoData {
  onDelete: (id: string, identityField: keyof ProdutoData) => Promise<void>;
  formatPrice: (price: number) => string;
}

export default function SingleProduto({
  onDelete,
  formatPrice,
  ...produtoData
}: SingleProdutoProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation<BottomTabProps>();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(produtoData.referenceKey, "referenceKey");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const goToEditScreen = () => {
    navigation.navigate("Cadastro", {
      cadastro: false,
      updateProduto: produtoData,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nome}>{produtoData.nome}</Text>
        <Text style={styles.preco}>{formatPrice(produtoData.preco)}</Text>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteButton}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color="red" />
          ) : (
            <Icon name="trash" color="red" size={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={goToEditScreen} style={styles.editButton}>
          <Icon name="pencil" color="blue" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.setor}>{produtoData.setor}</Text>
        <Text style={styles.id}>ID: {produtoData.id}</Text>
      </View>
    </View>
  );
}

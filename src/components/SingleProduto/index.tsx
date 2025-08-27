import { Text, View } from "react-native";
import { Produto } from "../../model/Produto";
import styles from "./styles";

interface SingleProdutoProps extends Produto {
  key: string;
}

export default function SingleProduto(props: SingleProdutoProps) {
  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace(".", ",")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nome}>{props.nome}</Text>
        <Text style={styles.preco}>{formatPrice(props.preco)}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.setor}>{props.setor}</Text>
        <Text style={styles.id}>ID: {props.id}</Text>
      </View>
    </View>
  );
}

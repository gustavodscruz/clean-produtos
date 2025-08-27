import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useProduto } from "../control/ProdutoController";
import { styles } from "./CadastroProdutoViewStyles";

const CadastroProdutoView = () => {
  const {
    handleProduto,
    produto,
    salvar,
    success,
    error,
    viewMessage,
    loading,
    limparFormulario,
    produtoErros,
  } = useProduto();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Cadastro de Produto 100% atualizado!</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o setor"
              value={produto.id ? String(produto.id) : ""}
              onChangeText={(input) => handleProduto(input, "id")}
            />
            <Text style={[styles.label, { color: "red", fontSize: 12 }]}>
              {produtoErros.id}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              value={produto.nome}
              onChangeText={(input) => handleProduto(input, "nome")}
            />
            <Text style={[styles.label, { color: "red", fontSize: 12 }]}>
              {produtoErros.nome}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite o preço"
              value={produto.preco ? String(produto.preco) : ""}
              onChangeText={(input) => handleProduto(input, "preco")}
            />
            <Text style={[styles.label, { color: "red", fontSize: 12 }]}>
              {produtoErros.preco}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Setor</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o setor"
              value={produto.setor}
              onChangeText={(input) => handleProduto(input, "setor")}
            />
            <Text style={[styles.label, { color: "red", fontSize: 12 }]}>
              {produtoErros.setor}
            </Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={salvar}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={limparFormulario}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" />}
          {success && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Parabéns!</Text>
              <Text style={styles.resultText}>{viewMessage}</Text>
            </View>
          )}
          {error && (
            <View style={[styles.resultBox, { backgroundColor: "red" }]}>
              <Text style={styles.resultTitle}>Ah não!</Text>
              <Text style={styles.resultText}>{viewMessage}</Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { CadastroProdutoView };

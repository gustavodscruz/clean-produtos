import {
  View,
  Text,
  StyleSheet,
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

const ProdutoView = () => {
  const { handleProduto, produto, salvar, submitted, erro, loading, limparFormulario } =
    useProduto();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
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
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              value={produto.nome}
              onChangeText={(input) => handleProduto(input, "nome")}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="Digite o preço"
              value={produto.preco ? String(produto.preco) : ""}
              onChangeText={(input) => handleProduto(input, "preco")}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Setor</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o setor"
              value={produto.setor}
              onChangeText={(input) => handleProduto(input, "setor")}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={salvar}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={limparFormulario}>
            <Text style={styles.buttonText}>Limpar formulário</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" />}
          {submitted && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Parabéns!</Text>
              <Text style={styles.resultText}>
                Produto {produto.nome} cadastrado com sucesso!
              </Text>
            </View>
          )}
          {erro && (
            <View style={[styles.resultBox, { backgroundColor: "red" }]}>
              <Text style={styles.resultTitle}>Ah não...</Text>
              <Text style={styles.resultText}>
                O produto {produto.nome} não foi cadastrado!
                Erro: {erro}
              </Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    padding: 24,
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 32,
    letterSpacing: 1,
  },
  formGroup: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: "#636e72",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#2d3436",
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#0984e3",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
    shadowColor: "#0984e3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    minWidth: '65%',
    textAlign: 'center'
  },
  resultBox: {
    backgroundColor: "#dff9fb",
    borderRadius: 8,
    padding: 18,
    marginTop: 10,
    width: "100%",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#00b894",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00b894",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#0984e3",
    marginBottom: 2,
  },
});

export { ProdutoView };

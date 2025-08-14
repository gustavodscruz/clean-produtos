import { useState } from "react";
import { Produto } from "../model/Produto";
import { ProdutoService } from "../service/ProdutoService";
import { Alert, Platform, ToastAndroid } from "react-native";

const useProduto = () => {
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    setor: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleProduto = (info: string, campo: keyof Produto) => {
    const obj = { ...produto };
    if (campo === "id" || campo === "preco") {
      obj[campo] = Number(info);
    } else {
      obj[campo] = info;
    }
    setProduto(obj);
  };

  const salvar = async () => {
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const resultado = await service.save(produto);
    setLoading(false);
    if (!resultado) {
      setErro("Erro ao gravar os dados!");
      return;
    }
    setSubmitted(true);
  };

  const limparFormulario = () => {
    setProduto({
      id: 0,
      nome: '',
      preco: 0.0,
      setor: ''
    })
    setSubmitted(false)
  }

  return { produto, handleProduto, salvar, loading, erro, submitted, limparFormulario };
};

export { useProduto };

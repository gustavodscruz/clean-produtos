import { ValidationError } from "yup";
import { useState } from "react";
import { Produto, produtoSchema, ProdutosDictionary } from "../model/Produto";
import { ProdutoService } from "../service/ProdutoService";
import { Alert, Platform, ToastAndroid } from "react-native";
import { SaveCallback } from "../interfaces/SaveCallback";
import { ProdutoErros } from "../interfaces/ProdutoErros";

const useProduto = () => {
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    setor: "",
  });
  const [produtoErros, setProdutoErros] = useState<ProdutoErros>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [viewMessage, setViewMessage] = useState<string | null>(null);
  const [listaProdutos, setListaProdutos] = useState<ProdutosDictionary>({})

  const handleProduto = (info: string, campo: keyof Produto) => {
    const obj = { ...produto };
    if (campo === "id") {
      obj[campo] = Number(info);
    } else if (campo === "preco") {
      const sanitized = info.replace(",", ".").replace(/[^0-9.]/g, "");
      obj[campo] = Number(sanitized);
    } else {
      obj[campo] = info;
    }
    setProduto(obj);
  };

  
  const saveCallback: SaveCallback = (success: boolean, message: string) => {
    if (success) {
      setSuccess(true);
      setViewMessage("Produto gravado com sucesso!");
    } else {
      setError(true);
      setViewMessage("Erro ao gravar o contato!\n" + message);
    }
    setLoading(false);
  };

  const salvar = () => {
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    service.save(produto, setProdutoErros, saveCallback);
    setLoading(false);
    findAllProdutos()
  };

  const limparFormulario = () => {
    setProduto({
      id: 0,
      nome: "",
      preco: 0.0,
      setor: "",
    });
    setSuccess(false);
    setError(false);
    setProdutoErros({});
  };

  const findAllProdutos = async () => {
    setLoading(true)
    const service: ProdutoService = new ProdutoService();
    const produtos : ProdutosDictionary = await service.findAll()
    setListaProdutos(produtos)
    setLoading(false)
  }

  return {
    produto,
    handleProduto,
    salvar,
    error,
    loading,
    viewMessage,
    success,
    limparFormulario,
    produtoErros,
    listaProdutos,
    findAllProdutos
  };
};

export { useProduto };

import { useState } from "react";
import {
  Produto,
  ProdutoData,
  ProdutoResponse,
} from "../model/Produto";
import { ProdutoService } from "../service/ProdutoService";

const useProduto = () => {
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    setor: "",
  });
  const [produtoErros, setProdutoErros] = useState<Partial<Produto>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [viewMessage, setViewMessage] = useState<string | null>(null);
  const [listaProdutos, setListaProdutos] = useState<ProdutoData[]>([]);

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

  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace(".", ",")}`;
  };

  const salvar = async () => {
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const response: ProdutoResponse = await service.save(produto);
    if (response.success) {
      setSuccess(true);
    } else {
      setError(true);
      setProdutoErros(response.errors ?? {});
    }
    setViewMessage(response.message);
    setLoading(false);
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
    limparFormulario();
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const response: ProdutoResponse = await service.findAll();
    if (!response.success) {
      setError(true);
      setViewMessage(response.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setViewMessage(response.message);
    setListaProdutos(response.data as ProdutoData[]);
    setLoading(false);
    limparMensagem();
  };

  const apagarProduto = async (
    id: string | number,
    identityField: keyof ProdutoData
  ) => {
    limparFormulario();
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const response: ProdutoResponse = await service.delete(id);
    if (!response.success) {
      setError(true);
      setViewMessage(response.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setViewMessage(response.message);

    setListaProdutos((listaAntiga) => {
      return listaAntiga.filter((produto) => {
        if (identityField === "referenceKey") {
          return produto.referenceKey !== id;
        }
        if (identityField === "id") {
          return produto.id !== id;
        }
        return true;
      });
    });

    setLoading(false);
    limparMensagem();
  };

  const limparMensagem = () => {
    setTimeout(() => {
      setViewMessage(null);
    }, 2500);
  };

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
    findAllProdutos,
    apagarProduto,
    formatPrice,
  };
};

export { useProduto };

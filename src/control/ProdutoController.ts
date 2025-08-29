import { useState, useEffect } from "react";
import { Produto, ProdutoData, ProdutoResponse } from "../model/Produto";
import { ProdutoService } from "../service/ProdutoService";

const useProduto = (produtoParaAtualizar?: ProdutoData | false) => {
  const [produto, setProduto] = useState<Produto | ProdutoData>({
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
  const [modoAtualizacao, setModoAtualizacao] = useState(
    !!produtoParaAtualizar
  );

  // useEffect para configurar produto para atualização
  useEffect(() => {
    if (produtoParaAtualizar) {
      setTimeout(() => {
        setProduto(produtoParaAtualizar);
        setModoAtualizacao(true);
      }, 200);
    }
  }, [produtoParaAtualizar]);

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
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  const handleNumericInput = (input: string, field: "id" | "preco") => {
    if (input === "") {
      handleProduto("", field);
      return;
    }

    const numericInput = input.replace(/[^0-9.]/g, "");

    const numericValue = parseFloat(numericInput);
    if (!isNaN(numericValue)) {
      handleProduto(numericInput, field);
    }
  };

  const salvar = async () => {
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const response: ProdutoResponse = await service.save(produto);
    if (!response.success) {
      setLoading(false);
      setError(true);
      setViewMessage(response.message);
      setProdutoErros(response.errors ?? {});
      return;
    }
    setLoading(false);
    setSuccess(true);
    setViewMessage(response.message);
    limparMensagem(false, true);
  };

  const findAllProdutos = async () => {
    limparMensagem();
    setListaProdutos([]);
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
    limparMensagem();
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

  const atualizar = async () => {
    setLoading(true);
    const service: ProdutoService = new ProdutoService();
    const response = await service.update(produto as ProdutoData);
    if (!response.success) {
      setError(true);
      setViewMessage(response.message);
      setProdutoErros(response.errors ?? {});
      setLoading(false);
      return;
    }
    setSuccess(true);
    setViewMessage(response.message);
    setLoading(false);
    limparMensagem(true, true);
  };

  const limparMensagem = (
    isUpdate: boolean = false,
    setDelay: boolean = false
  ) => {
    const limpeza = () => {
      setProduto({
        id: 0,
        nome: "",
        preco: 0.0,
        setor: "",
      });
      setSuccess(false);
      setError(false);
      setProdutoErros({});
      setViewMessage(null);
      isUpdate && setModoAtualizacao(false);
    };

    setDelay
      ? setTimeout(() => {
          limpeza();
        }, 2500)
      : limpeza();
  };

  const isError = () => {
    if (success) return true;
    if (error) return false;
  };

  return {
    produto,
    handleProduto,
    salvar,
    atualizar,
    error,
    loading,
    viewMessage,
    success,
    limparMensagem,
    produtoErros,
    listaProdutos,
    findAllProdutos,
    apagarProduto,
    formatPrice,
    setProduto,
    handleNumericInput,
    isError,
    modoAtualizacao,
    setModoAtualizacao,
  };
};

export { useProduto };

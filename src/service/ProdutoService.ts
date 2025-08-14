import { ProdutoFetcher } from "../fetcher/ProdutoFetcher";
import { Produto } from "../model/Produto";

class ProdutoService {
  async save(produto: Produto): Promise<boolean> {
    const fetcher = new ProdutoFetcher();

    try {
      if (!produto.nome || produto.nome.trim() === "") {
        throw new Error("O nome está vazio!");
      }
      await fetcher.save(produto);
      return true;
    } catch (error) {
      console.error("Erro!", error);
      return false;
    }
  }
}

export { ProdutoService };

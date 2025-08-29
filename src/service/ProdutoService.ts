import { ProdutoFetcher } from "../fetcher/ProdutoFetcher";
import {
  Produto,
  ProdutoData,
  ProdutoResponse,
  produtoSchema,
} from "../model/Produto";
import { ValidationError } from "yup";

class ProdutoService {
  private produtoFetcher: ProdutoFetcher;

  constructor() {
    this.produtoFetcher = new ProdutoFetcher();
  }

  async save(produto: Produto): Promise<ProdutoResponse> {
    let produtosErrors: ProdutoResponse["errors"];
    try {
      await produtoSchema.validate(produto, { abortEarly: false });
      return await this.produtoFetcher.save(produto);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((error: ValidationError) => {
          produtosErrors = {
            ...produtosErrors,
            [error.path as keyof Produto]: error.message,
          };
        });
      }

      return {
        success: false,
        errors: produtosErrors,
        message: "Dados inválidos",
      };
    }
  }

  async findAll() {
    return await this.produtoFetcher.findAll();
  }

  async delete(id: number | string) {
    return await this.produtoFetcher.delete(id);
  }

  async update(produtoData: ProdutoData) {
    let produtoErros: Partial<Produto> = {};
    try {
      const { referenceKey, ...produto } = produtoData;
      await produtoSchema.validate(produto, { abortEarly: false });
      return await this.produtoFetcher.update(referenceKey, produto);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((error: ValidationError) => {
          produtoErros = {
            ...produtoErros,
            [error.path as keyof Produto]: error.message,
          };
        });
      }

      return {
        success: false,
        errors: produtoErros,
        message: "Dados inválidos",
      };
    }
  }
}

export { ProdutoService };

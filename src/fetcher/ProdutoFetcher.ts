import {
  Produto,
  ProdutoResponse,
  ProdutosDictionary,
} from "../model/Produto";
import axios, { AxiosError, AxiosInstance } from "axios";

class ProdutoFetcher {
  private apiBase: AxiosInstance;
  private baseUrl: string = process.env.EXPO_PUBLIC_FIREBASE_RTDB_URL;
  private endpoint: string = "/products.json";

  constructor() {
    this.apiBase = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async save(produto: Produto): Promise<ProdutoResponse> {
    try {
      await this.apiBase.post(this.endpoint, produto);

      return {
        message: "Produto salvo com sucesso!",
        success: true,
      };
    } catch (error) {
      return {
        message: "Não foi possível salvar o produto!",
        success: false,
      };
    }
  }

  async update(
    id: string | number,
    produto: Produto
  ): Promise<ProdutoResponse> {
    try {
      const response = await this.apiBase.put(`/products/${id}.json`, produto);
      return {
        message: "Produto atualizado com sucesso!",
        success: true,
      };
    } catch (error) {
      let additionalMessage: string = "";
      if (error instanceof AxiosError) {
        additionalMessage = " " + error.message;
      }
      return {
        message: "Não foi possível atualizar o produto!" + additionalMessage,
        success: false,
      };
    }
  }

  async delete(id: number | string): Promise<ProdutoResponse> {
    try {
      await this.apiBase.delete(`products/${id}.json`);
      return {
        success: true,
        message: "Produto deletado com sucesso!",
      };
    } catch (error) {
      let additionalMessage: string = "";
      if (error instanceof AxiosError) {
        additionalMessage = " " + error.message;
      }
      return {
        success: false,
        message: "Não foi possível deletar o produto!" + additionalMessage,
      };
    }
  }

  async findAll(): Promise<ProdutoResponse> {
    try {
      const response = await this.apiBase.get(this.endpoint);
      const productsDictionary: ProdutosDictionary = response.data;
      const produtosArray = Object.entries(productsDictionary).map(
        ([referenceKey, produto]) => ({
          referenceKey,
          ...produto,
        })
      );
      const length = produtosArray.length;
      return {
        data: produtosArray,
        message: `${length} produto(s) carregado(s) com sucesso!`,
        success: true,
      };
    } catch (error) {
      return {
        message: "Não foi possível carregar produtos!",
        success: false,
      };
    }
  }
}

export { ProdutoFetcher };

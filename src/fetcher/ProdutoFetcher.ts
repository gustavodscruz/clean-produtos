
import { Produto } from "../model/Produto";
import axios from "axios";

class ProdutoFetcher {
  private apiBase = axios.create({
    baseURL: "https://clean-products-default-rtdb.firebaseio.com/",
  });

  async save(produto: Produto) {
    return this.apiBase.post("/products.json", produto);
  }
}

export { ProdutoFetcher };

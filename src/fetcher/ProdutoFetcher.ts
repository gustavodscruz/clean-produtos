import { SaveCallback } from "../interfaces/SaveCallback";
import { Produto, ProdutosDictionary } from "../model/Produto";
import axios from "axios";
interface algo {
  name : Produto
}
class ProdutoFetcher {
  private apiBase = axios.create({
    baseURL: "https://clean-products-default-rtdb.firebaseio.com/",
  });

  save(produto: Produto, callback: SaveCallback) {
    this.apiBase
      .post("/products.json", produto)
      .then(() => callback(true, ""))
      .catch((error: any) => callback(false, error));
  }

  async findAll() : Promise<ProdutosDictionary> {
    return (await this.apiBase.get("/products.json")).data as ProdutosDictionary;
  }
}

export { ProdutoFetcher };

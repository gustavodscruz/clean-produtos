
import { SaveCallback } from "../interfaces/SaveCallback";
import { Produto } from "../model/Produto";
import axios from "axios";

class ProdutoFetcher {
  private apiBase = axios.create({
    baseURL: "https://clean-products-default-rtdb.firebaseio.com/",
  });

  save(produto: Produto, callback : SaveCallback) {
    this.apiBase.post("/products.json", produto)
    .then(() => callback(true, ""))
    .catch((error : any) => callback(false, error))
  }
}

export { ProdutoFetcher };

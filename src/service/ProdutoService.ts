import { ProdutoFetcher } from "../fetcher/ProdutoFetcher";
import { SaveCallback } from "../interfaces/SaveCallback";
import { Produto, produtoSchema, ProdutosDictionary } from "../model/Produto";
import { ValidationError } from "yup";
import { ProdutoErros } from "../interfaces/ProdutoErros";

class ProdutoService {
  private validateProductForm = (
    produto: Produto,
    setProdutoErros: React.Dispatch<React.SetStateAction<ProdutoErros>>
  ) => {
    let isValid: boolean = false;
    produtoSchema
      .validate(produto, { abortEarly: false })
      .then(() => {
        isValid = true;
      })
      .catch((errors: ValidationError) => {
        setProdutoErros({});
        errors.inner.forEach((error: ValidationError) => {
          setProdutoErros((erros) => ({
            ...erros,
            [error.path as keyof typeof produto]: error.message,
          }));
        });
        isValid = false;
      });
    return isValid;
  };
  save(
    produto: Produto,
    setProdutoErros: React.Dispatch<React.SetStateAction<ProdutoErros>>,
    callback : SaveCallback
  ): void {
    if (!this.validateProductForm(produto, setProdutoErros)) return;
    const fetcher = new ProdutoFetcher();
    fetcher.save(produto, callback);
  }

  async findAll(){
    const fetcher = new ProdutoFetcher();
    return await fetcher.findAll();
  }
}

export { ProdutoService };

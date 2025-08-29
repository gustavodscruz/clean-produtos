import { number, object, Schema, string } from "yup";

interface Produto {
  id?: number;
  nome: string;
  preco: number;
  setor: string;
}

const produtoSchema: Schema<Produto> = object({
  id: number().integer().optional(),
  nome: string().required().min(5, "O nome deve ter no mínimo 5 caracteres"),
  preco: number().required().positive("Preço deve ter um valor maior que 0"),
  setor: string().required("Setor é obrigatório"),
});

interface ProdutoData extends Produto{
  referenceKey : string;
}

interface ProdutoResponse {
  data?: ProdutoData[];
  success: boolean;
  message: string;
  errors?: Partial<Produto>;
  status?: number;
}

type ProdutosDictionary = Record<string, Produto>;

export { Produto, produtoSchema, ProdutosDictionary, ProdutoResponse, ProdutoData };

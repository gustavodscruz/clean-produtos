import yup, { number, object, string } from "yup";

const produtoSchema = object({
  id: number().integer().notRequired(),
  nome: string().required().min(5, "O nome deve ter no mínimo 5 caracteres"),
  preco: number().required().positive("Preço deve ter um valor maior que 0"),
  setor: string().required("Setor é obrigatório"),
});

type Produto = yup.InferType<typeof produtoSchema>;

type ProdutosDictionary = Record<string, Produto>;


export { Produto, produtoSchema, ProdutosDictionary };

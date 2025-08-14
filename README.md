# Clean Produtos

## Descrição

O **Clean Produtos** é um aplicativo desenvolvido em React Native para gerenciar o cadastro de produtos. Ele utiliza o Firebase como backend para persistência de dados e segue uma arquitetura limpa, separando responsabilidades em controladores, serviços e fetchers.

## Funcionalidades

- Cadastro de produtos com os seguintes campos:
  - ID
  - Nome
  - Preço (com suporte a valores decimais)
  - Setor
- Validação de dados antes do envio.
- Integração com Firebase para salvar os produtos.
- Feedback visual para sucesso ou erro no cadastro.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile.
- **Firebase**: Backend para persistência de dados.
- **Axios**: Biblioteca para requisições HTTP.
- **Expo**: Ferramenta para facilitar o desenvolvimento e execução do app.

## Estrutura do Projeto

```plaintext
clean-produtos/
├── src/
│   ├── control/
│   │   └── ProdutoController.ts  # Hook para gerenciar estado e lógica de produto
│   ├── fetcher/
│   │   └── ProdutoFetcher.ts     # Classe para comunicação com o Firebase
│   ├── model/
│   │   └── Produto.ts            # Interface do modelo Produto
│   ├── service/
│   │   └── ProdutoService.ts     # Classe para validação e lógica de negócio
│   ├── view/
│   │   └── ProdutoView.tsx       # Tela principal do app
├── App.tsx                        # Entrada principal do app
├── package.json                   # Dependências e scripts do projeto
└── README.md                      # Documentação do projeto
```

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustavodscruz/clean-produtos.git
   cd clean-produtos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o app:
   ```bash
   npm start
   ```

4. Escaneie o QR Code com o aplicativo Expo Go no seu dispositivo ou execute em um emulador.


# MVP Txai

Um MPV com CRUD de usuários, produtos, e sistema de login.


## Instalação Backend

Acesse a pasta backend

```bash
  cd backend
```

Instale as dependencias e rode o backend

```bash
  npm i
  npm run start:dev
```
### Atenção

**.env**: tem um arquivo .envExemple deve ser renomeado para .env e feito a conexao correta com o MySQL


## Instalação Frontend
Acesse a pasta frontend

```bash
  cd frontent
```

Instale as dependencias e rode o frontend

```bash
  npm i
  npm run dev
```
    
## Documentação da API

### Login

```http
POST /login
```

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**. CPF do usuário |
| `senha` | `string` | **Obrigatório**.  Senha do usuário |


### Atenção

**Autenticação**: O usuário deve fornecer o CPF e a senha corretos para realizar o login. Em caso de sucesso, o endpoint retorna os dados do usuário para futuras requisições.



### Usuários

#### Retorna todos os itens

```http
  GET /users
```


#### Retorna um item

```http
  GET /users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Insere usuário

```http
 POST /users
```

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do usuário |
| `cpf` | `string` | **Obrigatório**. CPF único do usuário |
| `email` | `string` | **Opcional**. Email do usuário|
| `nomeUsuario` | `string` | **Obrigatório**.Nome de usuário |
| `senha` | `string` | **Obrigatório**. Senha do usuário |
| `foto	` | `string` | **Obrigatório**. URL da foto do usuário |
| `admin` | `boolean` | **Obrigatório**. Define se o usuário é admin |

```http
 PUT /users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do usuário |

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Opcional**. Nome do usuário |
| `cpf` | `string` | **Opcional**. CPF único do usuário |
| `email` | `string` | **Opcional**. Email do usuário|
| `nomeUsuario` | `string` | **Opcional**.Nome de usuário |
| `senha` | `string` | **Opcional**. Senha do usuário |
| `foto	` | `string` | **Opcional**. URL da foto do usuário |
| `admin` | `boolean` | **Opcional**. Define se o usuário é admin |


```http
DELETE /users/${id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Opcional**. Nome do usuário |


### Produtos

#### Retorna todos os produtos

```http
  GET /produtos
```


#### Retorna um produto

```http
  GET /produtos/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto. |

#### Insere produtos

```http
POST /produtos
```

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do produto |
| `precoVenda` | `string` | **Obrigatório**.  Preço de venda do produto |
| `estoque` | `int` | **Obrigatório**. Quantidade em estoque|
| `userId` | `int` | **Obrigatório**. ID do usuário que cadastrou |

```http
 PUT /produtos/${id}

 
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. O ID do produto. |

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Opcional**. Nome do produto |
| `precoVenda` | `string` | **Opcional**.  Preço de venda do produto |
| `estoque` | `int` | **Opcional**. Quantidade em estoque|
| `userId` | `int` | **Opcional**. ID do usuário que cadastrou |

```http
DELETE /produtos/${id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. O ID do produto. |




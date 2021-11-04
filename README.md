
# API AboutMe

### :gear: Configuração Inicial

Para rodar o projeto é necessário instalar o [Node.js](https://nodejs.org/)

Dentro da pasta do projeto abra o terminal e rode os seguintes comandos:

- para instalar todas as dependências `npm install`
- para rodar o projeto `npm start`

É necessário criar um arquivo .env com as informações do banco, vulgo:

 - CONNECTION_STRING: String de conexão do mongoDb.
 - PORT: Porta a ser usada (por padrão é 3000)

### :pushpin: Endpoints de Usuário

| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| POST| /users/login    | BODY (login, password)| Retorna as informações do usuário encontradas. Só irá retornar caso o usuário esteja ativado (ver rota de ativação abaixo). |
Exemplo de parâmetro:

```JSON
{
  "login":  "user",
  "password":  "123456"
}
```
Exemplo de retorno de sucesso:

```JSON
{
  "status":  true,
  "user":  {
	"ativado":  true,
	"_id":  "617743a6cebcbe553cea3cca",
	"login":  "user",
	"password":  "123456",
	"__v":  0
	}
}
```

| Método | Rota     | Paramêtro | Descrição                            |
| ------ | -------- | --------- | ------------------------------------ |
| POST| /users/ativar/:id| id, BODY(login, password)| Ativa um usuário especifico, atualiza as credenciais caso especificadas e seta a chave "ativado" como true. |

Exemplo de parâmetro:

```JSON
{
  "login":  "user",
  "password":  "123456"
}
```

Exemplo de retorno:

```JSON
{
 "status":  true,
 "user":  {
	"ativado":  true,
	"_id":  "617743a6cebcbe553cea3cca",
	"login":  "user",
	"password":  "123456",
	"__v":  0
	}
}
```

| Método | Rota      | Paramêtro | Descrição                                                        |
| ------ | --------- | --------- | ---------------------------------------------------------------- |
| POST| /users/create | | Cria um slot de usuário padrão, com login e senha aleatórios. |


Exemplo de retorno:

```JSON
{
	"ativado":  false,
	"_id":  "6181c06c098d333048b4151e",
	"login":  " T5SVt03FS70M",
	"password":  " Gw0jFL2kYmWn",
	"__v":  0
}
```


| Método | Rota      | Paramêtro | Descrição                                                        |
| ------ | --------- | --------- | ---------------------------------------------------------------- |
| PATCH| /users/update|BODY(login,password,newLogin,newPassword) | Atualiza uma credencial ativada existente, passando as credenciais antigas (obrigatório) e as novas (opcionais). Também muda o campo userLogin na página ligada ao usuário, caso exista.|
Exemplo de parâmetro:

```JSON
{
"login":  "user",
"password":  "123456",
"newLogin":"SuperTiberius",
"newPassword":"654321"
}
```
Exemplo de retorno:

```JSON
{
"status":  true,
"searchUser":  {
	"ativado":  true,
	"_id":  "617743a6cebcbe553cea3cca",
	"login":  "SuperTiberius",
	"password":  "654321",
	"__v":  0
	}
}
```
| Método | Rota      | Paramêtro | Descrição                                                        |
| ------ | --------- | --------- | ---------------------------------------------------------------- |
| DELETE| /users/delete|BODY(id) | Deleta um usuário. |
Exemplo de parâmetro:

```JSON
{
"id":  "6181c06c098d333048b4151e"
}
```
Exemplo de retorno:

```JSON
{
"status":  true,
"deletedUser":  {
	"ativado":  false,
	"_id":  "6181c06c098d333048b4151e",
	"login":  " T5SVt03FS70M",
	"password":  " Gw0jFL2kYmWn",
	"__v":  0
	}
}
```

### :pushpin: Endpoints da Página de Informações
| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| GET| /aboutinfo/search/:userlogin| userlogin| Procura uma página pela id de usuário especificado |

Exemplo de retorno de sucesso:

```JSON
{
	"status":  true,
	"info":  {
		"nome":  "Felipe Freire",
		"_id":  "6181d186cc326e1d78a2b4b2",
		"userLogin":  "SuperTiberius",
		"itens":  [
			{
			"_id":  "6181d186cc326e1d78a2b4b3",
			"key":  "Facebook",
			"value":  "www.facebook.com"
			},
			{
			"_id":  "6181d186cc326e1d78a2b4b4",
			"key":  "Twitter",
			"value":  "www.twitter.com"
			},
			{
			"_id":  "6181d186cc326e1d78a2b4b5",
			"key":  "Idade",
			"value":  "20"
			}
		],
		"__v":  0
	}
}
```

| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| POST| /aboutinfo/create| BODY (userLogin, nome,itens[key,value])| Cria uma nova página para o usuário especificado. Os itens devem seguir o esquema key,value. Apenas cria se o usuário existir e estiver como ativado. |
Exemplo de parâmetro:

```JSON
{
	"userLogin":"SuperTiberius",
	"nome":"Felipe Freire",
	"itens":[
	{"key":"Facebook","value":"www.facebook.com"},
	{"key":"Twitter","value":"www.twitter.com"},
	{"key":"Idade","value":"20"}
	]
}
```
Exemplo de retorno de sucesso:

```JSON
{
	"status":  true,
	"info":  {
		"nome":  "Felipe Freire",
		"_id":  "6181d186cc326e1d78a2b4b2",
		"userLogin":  "SuperTiberius",
		"itens":  [
			{
			"_id":  "6181d186cc326e1d78a2b4b3",
			"key":  "Facebook",
			"value":  "www.facebook.com"
			},
			{
			"_id":  "6181d186cc326e1d78a2b4b4",
			"key":  "Twitter",
			"value":  "www.twitter.com"
			},
			{
			"_id":  "6181d186cc326e1d78a2b4b5",
			"key":  "Idade",
			"value":  "20"
			}
		],
		"__v":  0
	}
}
```
| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| PUT| /aboutinfo/insertItem/:id| BODY (key, value)| Insere um item numa página especificada pela sua ID. |
Exemplo de parâmetro:

```JSON
{
	"key":"Notebook",
	"value":  "10"
}
```
Exemplo de retorno de sucesso:

```JSON
{
"status":  true,
"itemAdicionado":  {
	"_id":  "618320d15a2fa257f0a0eacd",
	"key":  "Notebook",
	"value":  "10"
	}
}
```
| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| PATCH| /aboutinfo/update/:id| BODY (id, key, value)| Atualiza um item identificado pela ID do próprio item. |
Exemplo de parâmetro:

```JSON
{
"itens":  [
		{
		"id":  "618320d15a2fa257f0a0eacd",
		"key":  "laptop",
		"value":  "40"
		}
	]
}
```
Exemplo de retorno de sucesso:

```JSON
{
	"status":  true,
	"algumItemModificado":  true,
		"info":  {
			"nome":  "Felipe Souza Freire",
			"_id":  "617c71e5e9d10a363080a589",
			"userLogin":  "Tiberius",
			"itens":  [
				{
				"_id":  "617d4bd51721d717ccba06af",
				"key":  "Notebook",
				"value":  "10"
				},
				{
				"_id":  "618320d15a2fa257f0a0eacd",
				"key":  "laptop",
				"value":  "40"
				}
			],
	"__v":  5
	}
}
```
| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| DELETE| /aboutinfo/deletePage/| BODY (id)| Deleta uma página passando a ID dela. |
Exemplo de parâmetro:

```JSON
{
	"id":  "61703ffa56e4fb27d0703162"
}
```
Exemplo de retorno de sucesso:

```JSON
{
	"status":  true,
	"deletedPage":  {
		"nome":  "false",
		"_id":  "61703ffa56e4fb27d0703162",
		"userID":  "KaiqueGay",
		"itens":  [
			{
			"_id":  "61703ffa56e4fb27d0703163",
			"key":  "OK",
			"value":  "Ok"
			}
		],
	"__v":  0
	}
}
```
| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| DELETE| /aboutinfo/deleteItem/:userid| BODY (itemid)| Deleta um item específico, passando o ID do item no body e o ID do usuário nos params. |
Exemplo de parâmetro:

```JSON
{
	"itemid":  "61703f5256e4fb27d070315d"
}
```
Exemplo de retorno de sucesso:

```JSON
{
	"status":  true,
	"message":  "Item Deletado",
	"itemRemovido":  {
		"_id":  "61703f5256e4fb27d070315d",
		"key":  "Teste",
		"value":  "TesteV"
	}
}
```


### :books: Dependências utilizadas

- [Express](https://www.npmjs.com/package/express)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Mongoose](https://www.npmjs.com/package/mongoose)

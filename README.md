# DSS-MVC — Sistema de Prescrições (Node + Express + TypeScript)

Projeto desenvolvido no âmbito da disciplina de **Desenvolvimento de Software em Saúde (DSS)** — FMUP.

Implementação de uma API REST seguindo o padrão **MVC** (Model-View-Controller) com Node.js, Express e TypeScript, utilizando armazenamento local em memória.

## Estrutura do Projeto

```
projeto-prescricoes/
├── node_modules/              # Gerado automaticamente (npm install)
├── src/
│   ├── routes/                # As "Portas" — define os caminhos/URLs
│   │   └── prescricao.routes.ts
│   ├── controllers/           # O "Cérebro" — recebe o pedido da UI
│   │   └── prescricao.controller.ts
│   ├── models/                # Os "Dados" — define a Prescrição
│   │   └── prescricao.entity.ts
│   ├── database/              # A "Ligação" — armazenamento local
│   │   └── local-storage.ts
│   └── app.ts                 # O "Motor" — ponto de entrada da aplicação
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração do TypeScript
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (verificar com `node -v`)
- npm (verificar com `npm -v`)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/Informatica-MEDCIDS/DSS-MVC.git
cd DSS-MVC

# Instalar dependências
npm install
```

## Como Correr

### Modo de desenvolvimento (com auto-reload)

```bash
npx nodemon src/app.ts
```

### Compilar para produção

```bash
npx tsc
node dist/app.js
```

> O servidor arranca em **<http://localhost:3000>**

## Endpoints da API

| Método | URL             | Descrição                      |
|--------|-----------------|--------------------------------|
| GET    | `/prescricoes`  | Listar todas as prescrições    |
| POST   | `/prescricoes`  | Criar uma nova prescrição      |

### Exemplo — Criar uma prescrição (POST)

```json
POST http://localhost:3000/prescricoes
Content-Type: application/json

{
  "medicamento": "Ibuprofeno",
  "dose": "400mg",
  "medico_nome": "Dra. Silva"
}
```

### Exemplo — Listar prescrições (GET)

```
GET http://localhost:3000/prescricoes
```

> Pode usar o [Postman](https://www.postman.com/) ou `curl` para testar os endpoints.

## Arquitetura MVC

| Camada         | Ficheiro                          | Responsabilidade                                  |
|----------------|-----------------------------------|---------------------------------------------------|
| **Routes**     | `prescricao.routes.ts`            | Define os URLs e liga-os ao controller             |
| **Controller** | `prescricao.controller.ts`        | Recebe o pedido HTTP e devolve a resposta          |
| **Model**      | `prescricao.entity.ts`            | Define a estrutura de dados (interface Prescrição) |
| **Database**   | `local-storage.ts`                | Simula a base de dados com um array em memória     |

## Tecnologias

- **Node.js** — Runtime JavaScript
- **Express** — Framework web para criação de APIs REST
- **TypeScript** — Superset de JavaScript com tipagem estática
- **nodemon** — Auto-reload em desenvolvimento
- **ts-node** — Execução direta de TypeScript sem compilação prévia

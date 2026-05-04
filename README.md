# DSS-MVC — Sistema de Prescrições e Exames (Node + Express + TypeScript + React)

Projeto desenvolvido no âmbito da disciplina de **Desenvolvimento de Software em Saúde (DSS)** — FMUP.

Implementação de uma API REST seguindo o padrão **MVC + Service** com Node.js, Express e TypeScript, utilizando armazenamento local em memória. Inclui um frontend em React que serve como camada **View** da arquitetura MVC.

## Estrutura do Projeto

```
projeto-prescricoes/
├── node_modules/              # Gerado automaticamente (npm install)
├── public/
│   └── index.html             # A "Vista" — frontend React (via CDN, sem build)
├── src/
│   ├── routes/                # As "Portas" — define os caminhos/URLs
│   │   ├── prescricao.routes.ts
│   │   └── exame.routes.ts
│   ├── controllers/           # O "Cérebro" — recebe o pedido da UI
│   │   ├── prescricao.controller.ts
│   │   └── exame.controller.ts
│   ├── services/              # A "Lógica" — regras de negócio
│   │   ├── prescricao.service.ts
│   │   └── exame.service.ts
│   ├── models/                # Os "Dados" — define as entidades
│   │   ├── prescricao.entity.ts
│   │   └── exame.entity.ts
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

> A interface React fica disponível em **<http://localhost:3000>** (mesma porta — servida directamente pelo Express)

## Endpoints da API

| Método | URL             | Descrição                      |
|--------|-----------------|--------------------------------|
| GET    | `/prescricoes`  | Listar todas as prescrições    |
| POST   | `/prescricoes`  | Criar uma nova prescrição      |
| GET    | `/pedidos-exames` | Listar todos os pedidos de exames |
| POST   | `/pedidos-exames` | Criar um novo pedido de exame     |
| GET    | `/exames`       | Alias para listar exames       |
| POST   | `/exames`       | Alias para criar exame         |

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

### Exemplo — Criar um exame (POST)

```json
POST http://localhost:3000/pedidos-exames
Content-Type: application/json

{
  "nome": "TAC Cranio",
  "codigo": "TC01",
  "medico_nome": "Dr. Silva"
}
```

### Exemplo — Listar exames (GET)

```
GET http://localhost:3000/pedidos-exames
```

## Regras de Exames

- **Regra de Negócio:** `codigo` do exame deve ter exatamente 4 caracteres, caso contrário o sistema devolve erro `400`.
- **Regra de Protocolo:** em criação com sucesso, o JSON inclui a mensagem:
`"Exame [NOME] registado no sistema"`.

> Pode usar o [Postman](https://www.postman.com/) ou `curl` para testar os endpoints.

## Arquitetura MVC + Service

| Camada         | Ficheiro                          | Responsabilidade                                              |
|----------------|-----------------------------------|---------------------------------------------------------------|
| **View**       | `public/index.html`               | Interface React — apresenta dados e envia pedidos ao servidor  |
| **Routes**     | `prescricao.routes.ts`            | Define os URLs e liga-os ao controller                         |
| **Controller** | `prescricao.controller.ts`        | Recebe o pedido HTTP e delega ao service                       |
| **Service**    | `prescricao.service.ts`           | Contém as regras de negócio (validações, criação de entidades) |
| **Model**      | `prescricao.entity.ts`            | Define a estrutura de dados (interface Prescrição)             |
| **Database**   | `local-storage.ts`                | Simula a base de dados com um array em memória                 |

### Fluxo completo (View → Controller → Service → Model)

```
Browser (public/index.html)
  │  fetch('/prescricoes')        ← GET: listar
  │  fetch('/prescricoes', POST)  ← POST: criar
  ▼
Routes (prescricao.routes.ts)
  ▼
Controller (prescricao.controller.ts)
  ▼
Service (prescricao.service.ts)   ← validações aqui
  ▼
Database (local-storage.ts)       ← array em memória
```

## Tecnologias

- **Node.js** — Runtime JavaScript
- **Express** — Framework web para criação de APIs REST
- **TypeScript** — Superset de JavaScript com tipagem estática
- **React 18** — Biblioteca para construção da interface (carregada via CDN)
- **nodemon** — Auto-reload em desenvolvimento
- **ts-node** — Execução direta de TypeScript sem compilação prévia

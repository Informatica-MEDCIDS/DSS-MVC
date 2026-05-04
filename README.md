# DSS-MVC — Sistema de Prescrições e Exames (Node + Express + TypeScript + React)

Projeto desenvolvido no âmbito da disciplina de **Desenvolvimento de Software em Saúde (DSS)** — FMUP.

Implementação de uma API REST seguindo o padrão **MVC + Service** com Node.js, Express e TypeScript, utilizando **TypeORM** como ORM e **SQLite** como base de dados persistente. Inclui um frontend em React que serve como camada **View** da arquitetura MVC.

## Estrutura do Projeto

```
DSS-MVC/
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
│   ├── models/                # Os "Dados" — entidades TypeORM
│   │   ├── prescricao.entity.ts
│   │   └── exame.entity.ts
│   ├── database/              # A "Ligação" — DataSource TypeORM
│   │   └── database.ts
│   └── app.ts                 # O "Motor" — ponto de entrada da aplicação
├── data.db                    # Ficheiro SQLite gerado automaticamente
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração do TypeScript
```

## O que é um ORM?

Um **ORM (Object-Relational Mapper)** é uma camada que permite trabalhar com a base de dados usando objetos e classes em vez de SQL direto. Cada classe representa uma tabela e cada instância representa uma linha.

Neste projeto, o TypeORM usa **decoradores** nas classes para fazer esse mapeamento:

```typescript
@Entity()                       // esta classe = uma tabela na BD
export class Prescricao {

    @PrimaryGeneratedColumn()   // coluna id, auto-incremento
    id!: number;

    @Column()                   // coluna normal
    medicamento!: string;

    @Column()
    dose!: string;

    @Column()
    medico_nome!: string;
}
```

Com isso, o serviço trabalha com objetos TypeScript em vez de queries SQL:

```typescript
// sem ORM (SQL direto)
db.prepare('SELECT * FROM prescricoes WHERE medicamento = ?').get(medicamento);

// com ORM (TypeORM)
repo.findOneBy({ medicamento });
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

> O ficheiro `data.db` é criado automaticamente na primeira execução com registos iniciais de exemplo.

## Endpoints da API

| Método | URL               | Descrição                         |
|--------|-------------------|-----------------------------------|
| GET    | `/prescricoes`    | Listar todas as prescrições       |
| POST   | `/prescricoes`    | Criar uma nova prescrição         |
| GET    | `/pedidos-exames` | Listar todos os pedidos de exames |
| POST   | `/pedidos-exames` | Criar um novo pedido de exame     |
| GET    | `/exames`         | Alias para listar exames          |
| POST   | `/exames`         | Alias para criar exame            |

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

```http
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

```http
GET http://localhost:3000/pedidos-exames
```

## Regras de Exames

- **Regra de Negócio:** `codigo` do exame deve ter exatamente 4 caracteres, caso contrário o sistema devolve erro `400`.
- **Regra de Protocolo:** em criação com sucesso, o JSON inclui a mensagem:
`"Exame [NOME] registado no sistema"`.

> Pode usar o [Postman](https://www.postman.com/) ou `curl` para testar os endpoints.

## Arquitetura MVC + Service

| Camada         | Ficheiro                   | Responsabilidade                                                        |
|----------------|----------------------------|-------------------------------------------------------------------------|
| **View**       | `public/index.html`        | Interface React — apresenta dados e envia pedidos ao servidor           |
| **Routes**     | `prescricao.routes.ts`     | Define os URLs e liga-os ao controller                                  |
| **Controller** | `prescricao.controller.ts` | Recebe o pedido HTTP e delega ao service                                |
| **Service**    | `prescricao.service.ts`    | Contém as regras de negócio (validações, criação de entidades)          |
| **Model**      | `prescricao.entity.ts`     | Classe TypeORM — define a estrutura da tabela via decoradores           |
| **Database**   | `database.ts`              | Configura e exporta o `AppDataSource` (TypeORM DataSource para SQLite)  |

### Fluxo completo (View → Controller → Service → ORM → BD)

```
Browser (public/index.html)
  │  fetch('/prescricoes')        ← GET: listar
  │  fetch('/prescricoes', POST)  ← POST: criar
  ▼
Routes (prescricao.routes.ts)
  ▼
Controller (prescricao.controller.ts)
  ▼
Service (prescricao.service.ts)      ← validações aqui
  ▼
TypeORM Repository (repo.find / repo.save)
  ▼
SQLite (data.db)
```

## Tecnologias

- **Node.js** — Runtime JavaScript
- **Express** — Framework web para criação de APIs REST
- **TypeScript** — Superset de JavaScript com tipagem estática
- **TypeORM** — ORM com mapeamento via decoradores TypeScript
- **SQLite** (`better-sqlite3`) — Base de dados relacional persistente em ficheiro
- **React 18** — Biblioteca para construção da interface (carregada via CDN)
- **nodemon** — Auto-reload em desenvolvimento
- **ts-node** — Execução direta de TypeScript sem compilação prévia

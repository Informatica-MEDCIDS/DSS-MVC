// src/database/local-storage.ts
import { Prescricao } from '../models/prescricao.entity';
import { User } from '../models/user.entity';

const bcrypt = require("bcryptjs");


// Esta lista simula a nossa tabela na base de dados
export const baseDeDadosLocal: Prescricao[] = [
    { id: 1, medicamento: "Aspirina", dose: "500mg", medico_nome: "Dr. House" }
];

// "Tabela" de utilizadores
export const baseDeDadosUsers: User[] = [
    { id: 1, username: "medico", password: bcrypt.hashSync("1234", 1), role: "medico" },
    { id: 2, username: "admin", password: bcrypt.hashSync("admin1234", 1), role: "admin" }
];

// src/database/local-storage.ts
import { Exame } from '../models/exame.entity';
import { Prescricao } from '../models/prescricao.entity';

// Esta lista simula a nossa tabela na base de dados
export const baseDeDadosLocal: Prescricao[] = [
    { id: 1, medicamento: "Aspirina", dose: "500mg", medico_nome: "Dr. House" , dataCriacao : new Date() }
];

// Esta lista simula a nossa tabela de exames na base de dados
export const baseDeDadosExamesLocal: Exame[] = [
    { id: 1, nome: "RX Torax", codigo: "RX01", medico_nome: "Dr. House" }
];

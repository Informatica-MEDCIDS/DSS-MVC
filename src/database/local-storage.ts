// src/database/local-storage.ts
import { Prescricao } from '../models/prescricao.entity';

// Esta lista simula a nossa tabela na base de dados
export const baseDeDadosLocal: Prescricao[] = [
    { id: 1, medicamento: "Aspirina", dose: "500mg", medico_nome: "Dr. House" }
];

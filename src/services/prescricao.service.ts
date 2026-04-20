// src/services/prescricao.service.ts
import { baseDeDadosLocal } from '../database/local-storage';
import { Prescricao } from '../models/prescricao.entity';

export class PrescricaoService {

    async criarPrescricao(dados: { medicamento: string, dose: string, medico_nome: string }): Promise<Prescricao> {

        const jaExiste = baseDeDadosLocal.find(p => p.medicamento === dados.medicamento && p.dose === dados.dose && p.medico_nome === dados.medico_nome);
        if (jaExiste) {
            throw new Error("Já existe uma prescrição igual registada no sistema.");
        }

        const nova: Prescricao = {
            id: baseDeDadosLocal.length + 1,
            medicamento: dados.medicamento,
            dose: dados.dose,
            medico_nome: dados.medico_nome
        };

        baseDeDadosLocal.push(nova);

        return nova;
    }

    async listarPrescricoes(): Promise<Prescricao[]> {

        return baseDeDadosLocal;

    }
}

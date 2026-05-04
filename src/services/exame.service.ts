import { baseDeDadosExamesLocal } from '../database/local-storage';
import { Exame } from '../models/exame.entity';

export class ExameService {

    async criarExame(dados: { nome: string, codigo: string, medico_nome: string }): Promise<Exame> {

        if (dados.codigo.length !== 4) {
            throw new Error("O código do exame deve ter exatamente 4 caracteres.");
        }

        const jaExiste = baseDeDadosExamesLocal.find(
            e => e.nome === dados.nome && e.codigo === dados.codigo && e.medico_nome === dados.medico_nome
        );
        if (jaExiste) {
            throw new Error("Já existe um exame igual registado no sistema.");
        }

        const novo: Exame = {
            id: baseDeDadosExamesLocal.length + 1,
            nome: dados.nome,
            codigo: dados.codigo,
            medico_nome: dados.medico_nome
        };

        baseDeDadosExamesLocal.push(novo);

        return novo;
    }

    async listarExames(): Promise<Exame[]> {
        return baseDeDadosExamesLocal;
    }
}

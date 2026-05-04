import { AppDataSource } from '../database/database';
import { Exame } from '../models/exame.entity';

export class ExameService {

    private repo = AppDataSource.getRepository(Exame);

    async criarExame(dados: { nome: string, codigo: string, medico_nome: string }): Promise<Exame> {

        if (dados.codigo.length !== 4) {
            throw new Error("O código do exame deve ter exatamente 4 caracteres.");
        }

        const jaExiste = await this.repo.findOneBy({
            nome: dados.nome,
            codigo: dados.codigo,
            medico_nome: dados.medico_nome,
        });
        if (jaExiste) {
            throw new Error("Já existe um exame igual registado no sistema.");
        }

        const novo = this.repo.create(dados);
        return this.repo.save(novo);
    }

    async listarExames(): Promise<Exame[]> {
        return this.repo.find();
    }
}

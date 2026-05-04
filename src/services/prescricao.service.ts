import { AppDataSource } from '../database/database';
import { Prescricao } from '../models/prescricao.entity';

export class PrescricaoService {

    private repo = AppDataSource.getRepository(Prescricao);

    async criarPrescricao(dados: { medicamento: string, dose: string, medico_nome: string }): Promise<Prescricao> {

        const jaExiste = await this.repo.findOneBy({
            medicamento: dados.medicamento,
            dose: dados.dose,
            medico_nome: dados.medico_nome,
        });
        if (jaExiste) {
            throw new Error("Já existe uma prescrição igual registada no sistema.");
        }

        const nova = this.repo.create(dados);
        return this.repo.save(nova);
    }

    async listarPrescricoes(): Promise<Prescricao[]> {
        return this.repo.find();
    }
}

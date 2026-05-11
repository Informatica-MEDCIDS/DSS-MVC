import { AppDataSource } from '../database/database';
import { Prescricao } from '../models/prescricao.entity';
import { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto';
import { PrescricaoResponseDto } from '../dtos/prescricao/prescricao-response.dto';

export class PrescricaoService {

    private repo = AppDataSource.getRepository(Prescricao);



    async criarPrescricao(
        dados: { medicamento: string; dose: string; medico_nome: string }
    ): Promise<Prescricao> {
        const jaExiste = await this.repo.findOneBy({
            medicamento: dados.medicamento,
            dose: dados.dose,
            medico_nome: dados.medico_nome,
        });

        if (jaExiste) {
            throw new Error('Já existe uma prescrição igual registada no sistema.');
        }

        const nova = this.repo.create({
            ...dados, // espalha os campos medicamento, dose e medico_nome
            dataCriacao: new Date(),
        });

        return this.repo.save(nova);
    }


    async criarPrescricaoComDTO(
        dados: CreatePrescricaoDto
    ): Promise<PrescricaoResponseDto> {
        const jaExiste = await this.repo.findOneBy({
            medicamento: dados.medicamento,
            dose: dados.dose,
            medico_nome: dados.medico_nome,
        });

        if (jaExiste) {
            throw new Error('Já existe uma prescrição igual registada no sistema.');
        }

        const nova = this.repo.create({
            ...dados,
            dataCriacao: new Date(),
        });

        const guardada = await this.repo.save(nova);
        return this.toResponseDto(guardada);
    }

    
    async listarPrescricoes(): Promise<Prescricao[]> {
        return this.repo.find();
    }

    async listarPrescricoesComDTO(): Promise<PrescricaoResponseDto[]> {
        const prescricoes = await this.repo.find();
        return prescricoes.map((prescricao) => this.toResponseDto(prescricao));
    }


    // Usando DTO, podemos controlar os campos devolvidos ao cliente.
    // Aqui, por exemplo, a dataCriacao existe na entidade Prescricao,
    // mas não é enviada na resposta.
    private toResponseDto(prescricao: Prescricao): PrescricaoResponseDto {
        return {
            id: prescricao.id,
            medicamento: prescricao.medicamento,
            dose: prescricao.dose,
            medico_nome: prescricao.medico_nome,
        };
    }

    
}

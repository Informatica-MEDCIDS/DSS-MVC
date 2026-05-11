import { Request, Response } from 'express';
import { PrescricaoService } from '../services/prescricao.service';
import { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto';

export class PrescricaoController {
    private service = new PrescricaoService();

    async listar(req: Request, res: Response) {
        const prescricoes = await this.service.listarPrescricoes();
        return res.json(prescricoes);
    }

    async listarComDTO(req: Request, res: Response) {
        const prescricoes = await this.service.listarPrescricoesComDTO();
        return res.json(prescricoes);
    }

    // Versão sem DTOs: os dados são usados diretamente a partir do req.body
    async criar(req: Request, res: Response) {
        try {
            const { medicamento, dose, medico_nome } = req.body;
            const novaPrescricao = await this.service.criarPrescricao({ medicamento, dose, medico_nome });

            return res.status(201).json(novaPrescricao);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    // Versão com DTOs: o formato esperado da entrada fica explícito
    async criarComDTO(req: Request, res: Response) {

        try {
            const dto: CreatePrescricaoDto = req.body;
            const novaPrescricao = await this.service.criarPrescricaoComDTO(dto);
            return res.status(201).json(novaPrescricao);

        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }


    
    
}

import { Request, Response } from 'express';
import { PrescricaoService } from '../services/prescricao.service';

export class PrescricaoController {
    private service = new PrescricaoService();

    async listar(req: Request, res: Response) {
        const prescricoes = await this.service.listarPrescricoes();
        return res.json(prescricoes);
    }

    async criar(req: Request, res: Response) {
        try {
            const { medicamento, dose, medico_nome } = req.body;

            const novaPrescricao = await this.service.criarPrescricao({ medicamento, dose, medico_nome });

            return res.status(201).json(novaPrescricao);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

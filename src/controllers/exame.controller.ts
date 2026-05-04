import { Request, Response } from 'express';
import { ExameService } from '../services/exame.service';

export class ExameController {
    private service = new ExameService();

    async listar(req: Request, res: Response) {
        const exames = await this.service.listarExames();
        return res.json(exames);
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, codigo, medico_nome } = req.body;

            const novoExame = await this.service.criarExame({ nome, codigo, medico_nome });

            return res.status(201).json({
                mensagem: `Exame ${novoExame.nome} registado no sistema`,
                exame: novoExame
            });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

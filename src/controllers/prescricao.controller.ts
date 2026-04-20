import { Request, Response } from 'express';
import { baseDeDadosLocal } from '../database/local-storage';
import { Prescricao } from '../models/prescricao.entity';

export class PrescricaoController {

    async listar(req: Request, res: Response) {
        // Retorna tudo o que está na nossa lista
        return res.json(baseDeDadosLocal);
    }

    async criar(req: Request, res: Response) {
        const { medicamento, dose, medico_nome } = req.body;

        // Criamos o objeto manualmente
        const nova: Prescricao = {
            id: baseDeDadosLocal.length + 1,
            medicamento,
            dose,
            medico_nome
        };

        // Guardamos na nossa lista "global"
        baseDeDadosLocal.push(nova);

        return res.status(201).json(nova);
    }
}

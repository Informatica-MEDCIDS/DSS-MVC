// Controller responsável pelo login.
// Recebe as credenciais enviadas no pedido HTTP, chama o AuthService
// para validar o utilizador e devolve o token JWT em caso de sucesso.
// Se a autenticação falhar, responde com erro 401.

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class LoginController {
    private authService = new AuthService();

    login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const token = this.authService.login(username, password);

            return res.status(200).json({
                mensagem: 'Login com sucesso',
                token
            });
        } catch (error: any) {
            return res.status(401).json({
                erro: error.message
            });
        }
    }
}
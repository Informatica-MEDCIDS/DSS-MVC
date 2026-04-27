// Camada de rotas da autenticação.
// Responsável por expor o endpoint de login e ligar a rota ao controller

import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';

const router = Router();
const controller = new LoginController();

router.post('/login', controller.login.bind(controller));

export default router;

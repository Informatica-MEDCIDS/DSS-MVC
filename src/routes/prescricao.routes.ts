import { Router } from 'express';
import { PrescricaoController } from '../controllers/prescricao.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const routes = Router();
const controller = new PrescricaoController();

// Todas as rotas abaixo ficam protegidas

routes.use(authMiddleware);
routes.get('/', controller.listar.bind(controller));

routes.post('/', controller.criar.bind(controller));

export default routes;

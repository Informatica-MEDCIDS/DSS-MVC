import { Router } from 'express';
import { PrescricaoController } from '../controllers/prescricao.controller';

const routes = Router();
const controller = new PrescricaoController();

routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));

export default routes;

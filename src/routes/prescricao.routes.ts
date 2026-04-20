import { Router } from 'express';
import { PrescricaoController } from '../controllers/prescricao.controller';

const routes = Router();
const controller = new PrescricaoController();

routes.get('/', controller.listar);
routes.post('/', controller.criar);

export default routes;

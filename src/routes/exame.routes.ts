import { Router } from 'express';
import { ExameController } from '../controllers/exame.controller';

const routes = Router();
const controller = new ExameController();

routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));

export default routes;

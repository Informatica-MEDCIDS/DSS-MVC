import { Router } from 'express';
import { PrescricaoController } from '../controllers/prescricao.controller';

const routes = Router();
const controller = new PrescricaoController();

/*routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));*/

//Trocar para usar o DTO e a nova versão do controller:

routes.get('/', controller.listarComDTO.bind(controller));
routes.post('/', controller.criarComDTO.bind(controller));


export default routes;

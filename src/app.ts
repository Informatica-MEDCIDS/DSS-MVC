import express from 'express';
import path from 'path';
import { AppDataSource } from './database/database';
import { Prescricao } from './models/prescricao.entity';
import { Exame } from './models/exame.entity';
import exameRoutes from './routes/exame.routes';
import prescricaoRoutes from './routes/prescricao.routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use('/prescricoes', prescricaoRoutes);
app.use('/exames', exameRoutes);
app.use('/pedidos-exames', exameRoutes);

if (require.main === module) {
    AppDataSource.initialize().then(async () => {

        const prescricaoRepo = AppDataSource.getRepository(Prescricao);
        if (await prescricaoRepo.count() === 0) {
            await prescricaoRepo.save({ medicamento: 'Aspirina', dose: '500mg', medico_nome: 'Dr. House', dataCriacao: new Date() });
        }

        const exameRepo = AppDataSource.getRepository(Exame);
        if (await exameRepo.count() === 0) {
            await exameRepo.save({ nome: 'RX Torax', codigo: 'RX01', medico_nome: 'Dr. House' });
        }

        app.listen(3000, () => console.log("Servidor (TypeORM + SQLite) a correr na porta 3000"));
    });
}

export default app;

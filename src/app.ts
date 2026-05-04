import express from 'express';
import path from 'path';
import exameRoutes from './routes/exame.routes';
import prescricaoRoutes from './routes/prescricao.routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use('/prescricoes', prescricaoRoutes);
app.use('/exames', exameRoutes);
app.use('/pedidos-exames', exameRoutes);

if (require.main === module) {
    app.listen(3000, () => console.log("Servidor Local (Em Memória) a correr na porta 3000"));
}

export default app;

import express from 'express';
import prescricaoRoutes from './routes/prescricao.routes';
const app = express();
app.use(express.json());
app.use('/prescricoes', prescricaoRoutes);
app.listen(3000, () => console.log("Servidor Local (Em Memória) a correr na porta 3000"));

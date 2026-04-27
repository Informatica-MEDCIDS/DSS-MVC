import express from 'express';
import prescricaoRoutes from './routes/prescricao.routes';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/prescricoes', prescricaoRoutes);
app.listen(3000, () => console.log("Servidor Local (Em Memória) a correr na porta 3000"));

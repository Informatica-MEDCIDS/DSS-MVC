import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Prescricao } from '../models/prescricao.entity';
import { Exame } from '../models/exame.entity';

// Configuração do DataSource para o TypeORM usando better-sqlite3

export const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: 'data.db',
    entities: [Prescricao, Exame],
    synchronize: true,
});

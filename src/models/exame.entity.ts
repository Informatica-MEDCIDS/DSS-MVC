import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Exame {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    codigo!: string;

    @Column()
    medico_nome!: string;
}

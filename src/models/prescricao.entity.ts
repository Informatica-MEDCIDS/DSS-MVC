import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prescricao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    medicamento!: string;

    @Column()
    dose!: string;

    @Column()
    medico_nome!: string;
}

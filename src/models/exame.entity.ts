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

    // CAMPO NOVO: data de criação da prescrição. Este campo é preenchido automaticamente quando a prescrição é criada. 
    // Restrito a utilização interna
    @Column()
    dataCriacao!: Date;
}

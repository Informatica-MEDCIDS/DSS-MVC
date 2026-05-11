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

    // CAMPO NOVO: data de criação da prescrição. Este campo é preenchido automaticamente quando a prescrição é criada. 
    // Restrito a utilização interna
    @Column()
    dataCriacao!: Date;
}

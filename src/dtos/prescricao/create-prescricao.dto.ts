// Define os dados de entrada para criar uma prescrição.

export interface CreatePrescricaoDto {
  medicamento: string;
  dose: string;
  medico_nome: string;
}
// Define os dados devolvidos ao cliente na resposta.

export interface PrescricaoResponseDto {
  id: number;
  medicamento: string;
  dose: string;
  medico_nome: string;
}
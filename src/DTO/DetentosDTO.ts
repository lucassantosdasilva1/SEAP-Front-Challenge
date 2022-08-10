export interface detentosDTO {
  id: number;
  nome: string;
  unidade: {
    id: number;
    descricao: string;
  };
  nomeMae: string;
  cpf: string;
}
export interface atendimentosDTO {
  id: number
  tipoAtendimento: {
    id: number
    descricao: string
  }
  detento: {
    id: number
    nome: string
  }
}
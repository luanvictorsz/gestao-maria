export type Status =
  | "novo"
  | "atendimento"
  | "aguardando"
  | "followup"
  | "fechado";

export interface Cliente {
  id: string;
  nome: string;
  status: Status;
  ultimaInteracao: number;
}

export interface Tarefa {
  id: string;
  titulo: string;
  data: string;
  clienteId?: string;
  concluido: boolean;
}
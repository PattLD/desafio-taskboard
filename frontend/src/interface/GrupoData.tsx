import type { TarefaData } from "./TarefaData";

export interface GrupoData {
  id: string;
  titulo: string;
  tarefas: TarefaData[];
}

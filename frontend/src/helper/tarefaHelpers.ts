import type { GrupoData } from "../interface/GrupoData";
import type { TarefaData } from "../interface/TarefaData";

export function addTarefaEmGrupo(
  grupos: GrupoData[],
  grupoId: string,
  tarefa: TarefaData,
): GrupoData[] {
  return grupos.map((g) =>
    g.id === grupoId ? { ...g, tarefas: [...(g.tarefas || []), tarefa] } : g,
  );
}

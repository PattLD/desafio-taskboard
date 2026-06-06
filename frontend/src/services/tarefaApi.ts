import type { TarefaData } from "../interface/TarefaData";
import api from "./api";

export const tarefaApi = {
  getAll: async (grupoId: string): Promise<TarefaData[]> => {
    const response = await api.get<TarefaData[]>(`/grupos/${grupoId}/tarefas`);
    return response.data;
  },

  create: async (
    grupoId: string,
    titulo: string,
    dataPrazo: string,
  ): Promise<TarefaData> => {
    const payload = {
      titulo,
      dataPrazo,
      completado: false,
      grupoId: grupoId,
    };
    const response = await api.post<TarefaData>("/tarefas", payload);
    return response.data;
  },

  update: async (
    grupoId: string,
    tarefaId: string,
    titulo: string,
    dataPrazo: string,
    completado: boolean,
  ): Promise<TarefaData> => {
    const payload = {
      titulo,
      dataPrazo,
      completado,
      grupoId: grupoId,
    };
    const response = await api.put<TarefaData>(`/tarefas/${tarefaId}`, payload);
    return response.data;
  },

  delete: async (tarefaId: string): Promise<void> => {
    await api.delete(`/tarefas/${tarefaId}`);
  },

  move: async (tarefaId: string, novoGrupoId: string): Promise<TarefaData> => {
    const response = await api.put<TarefaData>(
      `/tarefas/${tarefaId}/move/${novoGrupoId}`,
    );
    return response.data;
  },

  search: async (titulo: string): Promise<TarefaData[]> => {
    const response = await api.get<TarefaData[]>("/tarefas/pesquisa", {
      params: { titulo },
    });
    return response.data;
  },
};

export default { tarefas: tarefaApi };

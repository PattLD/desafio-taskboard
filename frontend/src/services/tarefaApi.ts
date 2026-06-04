import type { TarefaData } from "../interface/TarefaData";
import api from "./api";

export const tarefaApi = {
  getAll: async (grupoId: string): Promise<TarefaData[]> => {
    const response = await api.get<TarefaData[]>(`/grupos/${grupoId}/tarefas`);
    return response.data;
  },
};

export default { tarefas: tarefaApi };

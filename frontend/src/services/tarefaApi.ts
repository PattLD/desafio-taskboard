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
      tarefaGrupo: {
        id: grupoId,
      },
    };
    const response = await api.post<TarefaData>("/tarefas", payload);
    return response.data;
  },
};

export default { tarefas: tarefaApi };

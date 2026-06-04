import axios from "axios";
import type { GrupoData } from "../interface/GrupoData";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const grupoApi = {
  getAll: async (): Promise<GrupoData[]> => {
    const response = await api.get<GrupoData[]>("/grupos");
    return response.data;
  },

  create: async (titulo: string): Promise<GrupoData> => {
    const response = await api.post<GrupoData>("/grupos", { titulo });
    return response.data;
  },

  delete: async (grupoId: string): Promise<void> => {
    await api.delete(`/grupos/${grupoId}`);
  },

  update: async (id: string, titulo: string): Promise<GrupoData> => {
    const response = await api.patch<GrupoData>(`/grupos/${id}/titulo`, {
      titulo,
    });
    return response.data;
  },
};

export default {
  grupos: grupoApi,
};

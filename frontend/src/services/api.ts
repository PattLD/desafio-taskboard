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
};

export default {
  grupos: grupoApi,
};

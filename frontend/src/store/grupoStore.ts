import type { GrupoData } from "../interface/GrupoData";
import { create } from "zustand";
import { grupoApi } from "../services/api";

export interface GrupoStore {
  grupos: GrupoData[];
  carregando: boolean;
  listarGrupos: () => Promise<void>;
  createGrupo: (titulo: string) => Promise<void>;
}

export function addGrupo(grupos: GrupoData[], grupo: GrupoData): GrupoData[] {
  return [...grupos, grupo];
}

export const useGrupoStore = create<GrupoStore>((set, get) => ({
  grupos: [],
  carregando: false,

  listarGrupos: async () => {
    set({ carregando: true });
    try {
      const grupos = await grupoApi.getAll();
      set({ grupos, carregando: false });
    } catch (error) {
      console.error("Houve um erro na busca de grupos: ", error);
      set({ carregando: false });
    }
  },

  createGrupo: async (titulo: string) => {
    const tempId = "temp-" + Date.now();
    const tempGrupo = { id: tempId, titulo, tarefas: [] };

    set((state) => ({
      grupos: addGrupo(state.grupos, tempGrupo),
    }));

    try {
      const novoGrupo = await grupoApi.create(titulo);
      set((state) => ({
        grupos: state.grupos.map((g) => (g.id === tempId ? novoGrupo : g)),
      }));
    } catch (error) {
      set((state) => ({
        grupos: state.grupos.filter((g) => g.id !== tempId),
      }));
      console.error("Houve um erro na criação do grupo:", error);
      throw error;
    }
  },
}));

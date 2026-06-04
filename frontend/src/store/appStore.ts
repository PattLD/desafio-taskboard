import type { GrupoData } from "../interface/GrupoData";
import { create } from "zustand";
import { grupoApi } from "../services/grupoApi";
import { tarefaApi } from "../services/tarefaApi";
import { addTarefaEmGrupo } from "../helper/tarefaHelpers";

export interface GrupoStore {
  grupos: GrupoData[];
  carregando: boolean;
  listarGrupos: () => Promise<void>;
  createGrupo: (titulo: string) => Promise<void>;
  deleteGrupo: (id: string) => Promise<void>;
  updateGrupo: (id: string, titulo: string) => Promise<void>;
  createTarefa: (
    grupoId: string,
    titulo: string,
    dataPrazo: string,
  ) => Promise<void>;
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

  deleteGrupo: async (grupoId: string) => {
    try {
      set((state) => ({
        grupos: state.grupos.filter((g) => g.id !== grupoId),
      }));
      await grupoApi.delete(grupoId);
    } catch (error) {
      console.error("Houve um erros ao deletar grupo:", error);
      throw error;
    }
  },

  updateGrupo: async (grupoId: string, titulo: string) => {
    try {
      const atualizado = await grupoApi.update(grupoId, titulo);
      set((state) => ({
        grupos: state.grupos.map((g) => (g.id === grupoId ? atualizado : g)),
      }));
    } catch (error) {
      console.error("Houve um erro ao atualizar grupo:", error);
      throw error;
    }
  },

  // tarefas endpoint

  createTarefa: async (grupoId: string, titulo: string, dataPrazo: string) => {
    try {
      const novaTarefa = await tarefaApi.create(grupoId, titulo, dataPrazo);

      const tarefaCompletada = {
        ...novaTarefa,
        completado: novaTarefa.completado ?? false,
      };
      set((state) => ({
        grupos: addTarefaEmGrupo(state.grupos, grupoId, tarefaCompletada),
      }));
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      throw error;
    }
  },
}));

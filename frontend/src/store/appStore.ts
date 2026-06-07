import type { GrupoData } from "../interface/GrupoData";
import { create } from "zustand";
import { grupoApi } from "../services/grupoApi";
import { tarefaApi } from "../services/tarefaApi";
import {
  addGrupo,
  addTarefaEmGrupo,
  checkTarefaEmGrupo,
  deleteTarefaInGrupo,
  moveTarefaEmGrupoHelper,
  updateTarefaEmGrupo,
} from "../helper/appHelpers";

export interface AppStore {
  grupos: GrupoData[];
  carregando: boolean;
  listarGrupos: () => Promise<void>;
  createGrupo: (titulo: string) => Promise<void>;
  deleteGrupo: (id: string) => Promise<void>;
  updateGrupo: (id: string, titulo: string) => Promise<void>;

  createTarefa: (
    grupoId: string,
    titulo: string,
    dataPrazo?: string,
  ) => Promise<void>;
  updateTarefa: (
    grupoId: string,
    tarefaId: string,
    titulo: string,
    completado: boolean,
    dataPrazo?: string,
  ) => Promise<void>;
  checkTarefa: (grupoId: string, tarefaId: string) => Promise<void>;
  deleteTarefa: (grupoId: string, tarefaId: string) => Promise<void>;
  moveTarefaEmGrupo: (
    origemGrupoId: string,
    novoGrupoId: string,
    tarefaId: string,
  ) => Promise<void>;
  setPesquisaTarefa: (term: string) => void;
  pesquisaTarefa: string;
}

export const useAppStore = create<AppStore>((set, get) => ({
  grupos: [],
  carregando: false,
  pesquisaTarefa: "",

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

  createTarefa: async (grupoId: string, titulo: string, dataPrazo?: string) => {
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
      console.error("Houve um erro ao criar atividade:", error);
      throw error;
    }
  },

  updateTarefa: async (
    grupoId: string,
    tarefaId: string,
    titulo: string,
    completado: boolean,
    dataPrazo?: string,
  ) => {
    try {
      const updated = await tarefaApi.update(
        grupoId,
        tarefaId,
        titulo,
        completado,
        dataPrazo,
      );
      set((state) => ({
        grupos: updateTarefaEmGrupo(state.grupos, grupoId, updated),
      }));
    } catch (error) {
      console.error("Houve um erro ao atualizar tarefa:", error);
      throw error;
    }
  },

  checkTarefa: async (grupoId: string, tarefaId: string) => {
    const grupo = get().grupos.find((g) => g.id === grupoId);
    const tarefa = grupo?.tarefas.find((a) => a.id === tarefaId);
    if (!tarefa) {
      console.error("Tarefa não encontrada: ", tarefaId);
      return;
    }

    const atualCompletado = tarefa.completado ?? false;
    const novoCompletado = !atualCompletado;

    set((state) => ({
      grupos: checkTarefaEmGrupo(
        state.grupos,
        grupoId,
        tarefaId,
        novoCompletado,
      ),
    }));

    try {
      await tarefaApi.update(
        grupoId,
        tarefaId,
        tarefa.titulo,
        novoCompletado,
        tarefa.dataPrazo,
      );
    } catch (error) {
      console.error("Houve um erro ao alternar status da atividade:", error);
      set((state) => ({
        grupos: checkTarefaEmGrupo(
          state.grupos,
          grupoId,
          tarefaId,
          atualCompletado,
        ),
      }));
    }
  },

  deleteTarefa: async (grupoId: string, tarefaId: string) => {
    try {
      set((state) => ({
        grupos: deleteTarefaInGrupo(state.grupos, grupoId, tarefaId),
      }));
      await tarefaApi.delete(tarefaId);
    } catch (error) {
      console.error(" Houve um erro ao deletar:", error);
    }
  },

  moveTarefaEmGrupo: async (
    origemGrupoId: string,
    novoGrupoId: string,
    tarefaId: string,
  ) => {
    const origemGrupo = get().grupos.find((g) => g.id === origemGrupoId);
    const tarefa = origemGrupo?.tarefas?.find((t) => t.id === tarefaId);

    if (!tarefa) {
      return;
    }

    set((state) => ({
      grupos: moveTarefaEmGrupoHelper(
        state.grupos,
        origemGrupoId,
        novoGrupoId,
        tarefa,
      ),
    }));

    try {
      await tarefaApi.move(tarefaId, novoGrupoId);
    } catch (error) {
      console.error(" Houve um erro ao mover atividade:", error);
      get().listarGrupos();
    }
  },

  setPesquisaTarefa: (Tarefa: string) => {
    set({ pesquisaTarefa: Tarefa });
  },
}));

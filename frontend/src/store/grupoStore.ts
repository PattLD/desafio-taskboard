import type { GrupoData } from "../interface/GrupoData";
import { create } from "zustand";
import { grupoApi } from "../services/api";

export interface GrupoStore {
  grupos: GrupoData[];
  carregando: boolean;
  listarGrupos: () => Promise<void>;
}

export const useGrupoStore = create<GrupoStore>((set, get) => ({
  grupos: [],
  carregando: false,

  listarGrupos: async () => {
    set({carregando:true});
    try {
        const grupos = await grupoApi.getAll()
        set({grupos, carregando: false})
    } catch (error) {
        console.error("Houve um erro na busca de grupos: ", error)
        set({carregando: false})
    }
  }
}))
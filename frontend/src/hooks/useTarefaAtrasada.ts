import { useMemo } from "react";
import { useAppStore } from "../store/appStore";

export function useTarefaATrasada() {
  const grupos = useAppStore((state) => state.grupos);
  const contagemAtrasada = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let contagem = 0;
    grupos.forEach((grupo) => {
      grupo.tarefas?.forEach((tarefa) => {
        if (tarefa.dataPrazo) {
          const [ano, mes, dia] = tarefa.dataPrazo.split("-").map(Number);
          const dataPrazo = new Date(ano, mes - 1, dia);
          dataPrazo.setHours(0, 0, 0, 0);
          if (!tarefa.completado && dataPrazo < hoje) {
            contagem++;
          }
        }
      });
    });
    return contagem;
  }, [grupos]);
  return contagemAtrasada;
}

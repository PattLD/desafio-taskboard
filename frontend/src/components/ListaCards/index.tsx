import type { TarefaData } from "../../interface/TarefaData";
import Card from "../Card";

interface ListaCardsProps {
  grupoId: string;
  tarefas: TarefaData[];
}

export function ListaCards({ grupoId, tarefas }: ListaCardsProps) {
  if (!tarefas || tarefas.length === 0) {
    return <div>Nenhuma tarefa encontrada neste grupo.</div>;
  }

  return (
    <div>
      {tarefas.map((tarefas) => (
        <Card
          grupoId={grupoId}
          key={tarefas.id}
          id={tarefas.id}
          titulo={tarefas.titulo}
          dataPrazo={tarefas.dataPrazo}
          completado={tarefas.completado}
        />
      ))}
    </div>
  );
}

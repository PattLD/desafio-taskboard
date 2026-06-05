import type { TarefaData } from "../../interface/TarefaData";
import Card from "../Card";

interface ListaCardsProps {
  grupoId: string;
  tarefas: TarefaData[];
}

export function ListaCards({ grupoId, tarefas }: ListaCardsProps) {
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

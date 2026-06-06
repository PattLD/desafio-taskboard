import type { TarefaData } from "../../interface/TarefaData";
import Card from "../Card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ListaCardsProps {
  grupoId: string;
  tarefas: TarefaData[];
}

export function ListaCards({ grupoId, tarefas }: ListaCardsProps) {
  const { setNodeRef } = useDroppable({
    id: grupoId,
  });

  return (
    <div ref={setNodeRef} style={{ minHeight: "10px" }}>
      <SortableContext
        items={tarefas.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </div>
  );
}

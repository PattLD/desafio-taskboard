import "./styles.css";
import { FaSquareCheck } from "react-icons/fa6";
import BarraPesquisa from "../../components/BarraPesquisa";
import Grupo from "../../components/Grupo";
import { useAppStore } from "../../store/appStore";
import { useEffect, useState } from "react";
import BotaoGrupo from "../../components/BotaoGrupo";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { TarefaData } from "../../interface/TarefaData";
import Card from "../../components/Card";
import { Notificacao } from "../../components/Notificação";

function Home() {
  const {
    grupos,
    carregando,
    listarGrupos,
    moveTarefaEmGrupo,
    pesquisaTarefa,
  } = useAppStore();
  const [tarefaAtiva, setTarefaAtiva] = useState<TarefaData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  useEffect(() => {
    listarGrupos();
  }, [listarGrupos]);

  const handleDragStart = (event: DragStartEvent) => {
    const tarefaId = event.active.id as string;
    const tarefa = grupos
      .flatMap((g) => g.tarefas || [])
      .find((t) => t.id === tarefaId);
    setTarefaAtiva(tarefa || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setTarefaAtiva(null);
    if (!over) return;

    const tarefaId = String(active.id);
    const targetId = String(over.id);

    const origemGrupo = grupos.find((g) =>
      g.tarefas?.some((t) => String(t.id) === tarefaId),
    );
    const novoGrupo = grupos.find(
      (g) =>
        String(g.id) === targetId ||
        g.tarefas?.some((t) => String(t.id) === targetId),
    );
    if (!origemGrupo || !novoGrupo || origemGrupo.id === novoGrupo.id) {
      return;
    }
    await moveTarefaEmGrupo(origemGrupo.id, novoGrupo.id, tarefaId);
  };

  const filtraGrupos = !pesquisaTarefa.trim()
    ? grupos
    : grupos
        .map((grupo) => ({
          ...grupo,
          tarefas: grupo.tarefas?.filter((tarefa) =>
            tarefa.titulo.toLowerCase().includes(pesquisaTarefa.toLowerCase()),
          ),
        }))
        .filter((grupo) => grupo.tarefas.length > 0);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="header">
        <FaSquareCheck size={28} color="#1275d1" />
        <h1 className="title">TaskBoard</h1>
        <BarraPesquisa />
        <div className="header-notification">
          <Notificacao />
        </div>
      </div>
      <div className="container">
        <div className="lista-grupos">
          {!carregando &&
            filtraGrupos.map((grupo) => (
              <div key={grupo.id}>
                <Grupo grupo={grupo} />
              </div>
            ))}
          <BotaoGrupo />
        </div>
      </div>
      <DragOverlay>
        {tarefaAtiva && (
          <div>
            <Card
              grupoId=""
              id={tarefaAtiva.id}
              titulo={tarefaAtiva.titulo}
              dataPrazo={tarefaAtiva.dataPrazo}
              completado={tarefaAtiva.completado}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default Home;

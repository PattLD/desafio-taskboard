import "./styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useGrupoStore } from "../../store/appStore";
import { useState } from "react";
import TarefaModal from "../TarefaModal";
import { formatarData, isAtrasada } from "../../utils/dataUtils";
import BotaoDelete from "../BotaoDelete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  id: string;
  grupoId: string;
  titulo: string;
  dataPrazo: string;
  completado: boolean;
}

function Card({
  id,
  grupoId,
  titulo,
  dataPrazo,
  completado = false,
}: CardProps) {
  const [editValue, setEditValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dataValue, setDataValue] = useState("");
  const { updateTarefa, checkTarefa, deleteTarefa } = useGrupoStore();

  const handleUpdate = async () => {
    if (!editValue.trim()) return;
    await updateTarefa(grupoId, id, editValue, dataValue, completado);
    setOpenModal(false);
  };

  const handleModal = (open: boolean) => {
    setEditValue(titulo);
    setDataValue(dataPrazo);
    setOpenModal(open);
  };

  const statusData = () => {
    if (completado) return <p>{formatarData(dataPrazo)} - Concluído!</p>;
    if (!completado && isAtrasada(dataPrazo))
      return <p>{formatarData(dataPrazo)} - Em atraso!</p>;
    else return <p>{formatarData(dataPrazo)}</p>;
  };

  const handleDelete = async () => {
    await deleteTarefa(grupoId, id);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`card-container 
        ${completado ? "card-completado" : ""} 
        ${!completado && isAtrasada(dataPrazo) ? "card-atrasado" : ""}
      `}
        {...listeners}
        {...attributes}
      >
        <BotaoDelete className="card-delete-btn" evento={handleDelete} />
        <span className="tarefa-texto" onClick={() => handleModal(true)}>
          {titulo}
        </span>
        <div className="card-footer">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox-status"
            checked={completado}
            onChange={() => checkTarefa(grupoId, id)}
          />
          <div className="data">
            <MdOutlineCalendarToday size={13} />
            {statusData()}
          </div>
        </div>
        <TarefaModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          value={editValue}
          setValue={setEditValue}
          dateValue={dataValue}
          setDateValue={setDataValue}
          onSave={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Card;

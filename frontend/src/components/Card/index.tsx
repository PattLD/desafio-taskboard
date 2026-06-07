import "./styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useAppStore } from "../../store/appStore";
import { useState } from "react";
import Modal from "../Modal";
import { formatarData, isAtrasada } from "../../utils/dataUtils";
import BotaoDelete from "../BotaoDelete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormTarefa from "../FormTarefa";
import FormDate from "../FormDate";

interface CardProps {
  id: string;
  grupoId: string;
  titulo: string;
  completado: boolean;
  dataPrazo?: string;
}

function Card({
  id,
  grupoId,
  titulo,
  dataPrazo,
  completado = false,
}: CardProps) {
  const [editValue, setEditValue] = useState("");
  const [OpenModalTarefa, setOpenModalTarefa] = useState(false);
  const [OpenModalData, setOpenModalData] = useState(false);
  const [dataValue, setDataValue] = useState(dataPrazo || "");
  const { updateTarefa, checkTarefa, deleteTarefa } = useAppStore();

  const handleUpdate = async () => {
    if (!editValue.trim()) return;
    await updateTarefa(
      grupoId,
      id,
      editValue,
      completado,
      dataValue || undefined,
    );
    setOpenModalData(false);
    setOpenModalTarefa(false);
  };

  const handleModalTarefa = (open: boolean) => {
    setEditValue(titulo);
    setDataValue(dataPrazo || "");
    setOpenModalTarefa(open);
  };

  const handleModalData = (open: boolean) => {
    setEditValue(titulo);
    setDataValue(dataPrazo || "");
    setOpenModalData(open);
  };

  const statusData = () => {
    if (!dataPrazo) return null;
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
        <span className="tarefa-texto" onClick={() => handleModalTarefa(true)}>
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
          <div className="data" onClick={() => handleModalData(true)}>
            <MdOutlineCalendarToday size={13} />
            {statusData()}
          </div>
        </div>
        <Modal
          isOpen={OpenModalTarefa}
          onClose={() => setOpenModalTarefa(false)}
          onSave={handleUpdate}
          disableBotaoSalvar={!editValue.trim()}
        >
          <FormTarefa setValue={setEditValue} value={editValue}></FormTarefa>
        </Modal>

        <Modal
          isOpen={OpenModalData}
          onClose={() => setOpenModalData(false)}
          onSave={handleUpdate}
          disableBotaoSalvar={!editValue.trim()}
        >
          <FormDate
            dateValue={dataValue}
            setDateValue={setDataValue}
          ></FormDate>
        </Modal>
      </div>
    </div>
  );
}

export default Card;

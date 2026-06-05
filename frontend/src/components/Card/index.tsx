import "./styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useGrupoStore } from "../../store/appStore";
import { useState } from "react";
import TarefaModal from "../TarefaModal";
import { formatarData, isAtrasada } from "../../utils/dataUtils";

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
  const { updateTarefa, checkTarefa } = useGrupoStore();

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

  {
    statusData();
  }

  return (
    <div
      className={`card-container 
        ${completado ? "card-completado" : ""} 
        ${!completado && isAtrasada(dataPrazo) ? "card-atrasado" : ""}
      `}
    >
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
  );
}

export default Card;

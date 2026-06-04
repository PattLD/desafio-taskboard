import { useFormStatus } from "react-dom";
import "./styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useGrupoStore } from "../../store/appStore";
import { useState } from "react";
import TarefaModal from "../TarefaModal";

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
  const [novaTarefa, setnovaTarefa] = useState("");
  const { updateTarefa } = useGrupoStore();

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

  return (
    <div className="card-container" style={{ borderLeft: "6px solid #4d8df4" }}>
      <span className="tarefa-texto" onClick={() => handleModal(true)}>
        {titulo}
      </span>
      <div className="card-footer">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox-status"
          checked={completado}
        />
        <div className="data">
          <MdOutlineCalendarToday size={13} />
          <p>{dataPrazo}</p>
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

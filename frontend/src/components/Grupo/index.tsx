import "./styles.css";
import type { GrupoData } from "../../interface/GrupoData";
import { useState } from "react";
import { useGrupoStore } from "../../store/appStore";
import { ListaCards } from "../ListaCards";
import TarefaModal from "../TarefaModal";

interface GrupoProps {
  grupo: GrupoData;
}

function Grupo({ grupo }: GrupoProps) {
  const contagem = 6;
  const [titulo, setTitulo] = useState(grupo?.titulo ?? "");
  const deleteGrupo = useGrupoStore((state) => state.deleteGrupo);
  const updateGrupo = useGrupoStore((state) => state.updateGrupo);
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataValue, setDataValue] = useState("");
  const [novaTarefa, setnovaTarefa] = useState("");
  const { createTarefa } = useGrupoStore();

  const handleUpdateTitulo = async () => {
    if (!titulo.trim()) {
      setTitulo(grupo.titulo);
      setEditandoTitulo(false);
      return;
    } else if (titulo.trim() == grupo.titulo) {
      setEditandoTitulo(false);
      return;
    }
    setEditandoTitulo(false);
    await updateGrupo(grupo.id, titulo);
  };

  const handleAdd = async () => {
    if (!novaTarefa.trim() || !dataValue.trim()) return;
    await createTarefa(grupo.id, novaTarefa, dataValue);
    setnovaTarefa("");
    setDataValue("");
    setOpenModal(false);
  };

  return (
    <div className="grupo-container">
      <button
        className="grupo-deletar-botao"
        title="Excluir grupo"
        onClick={() => deleteGrupo(grupo.id)}
      >
        ✕
      </button>

      <div className="grupo-header">
        {editandoTitulo ? (
          <input
            className="input-titulo"
            type="text"
            autoFocus
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onBlur={handleUpdateTitulo}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTitulo();
              if (e.key === "Escape") setEditandoTitulo(false);
            }}
          />
        ) : (
          <h2 onClick={() => setEditandoTitulo(true)} className="grupo-titulo">
            {titulo}
          </h2>
        )}
        <div className="grupo-contagem">
          <p>{contagem}</p>
        </div>
      </div>
      <div className="grupo-cards">
        <ListaCards grupoId={grupo.id} tarefas={grupo.tarefas || []} />
      </div>
      <button className="card-botao" onClick={() => setOpenModal(true)}>
        + Novo Card
      </button>
      <TarefaModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        value={novaTarefa}
        setValue={setnovaTarefa}
        dateValue={dataValue}
        setDateValue={setDataValue}
        onSave={handleAdd}
      />
    </div>
  );
}

export default Grupo;

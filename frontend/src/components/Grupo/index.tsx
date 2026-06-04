import "./styles.css";
import type { GrupoData } from "../../interface/GrupoData";
import { useState } from "react";
import { useGrupoStore } from "../../store/grupoStore";

interface GrupoProps {
  grupo: GrupoData;
}

function Grupo({ grupo }: GrupoProps) {
  const contagem = 6;
  const [titulo, setTitulo] = useState(grupo?.titulo ?? "");
  const deleteGrupo = useGrupoStore((state) => state.deleteGrupo);

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
        <h2 className="grupo-titulo">{titulo}</h2>
        <div className="grupo-contagem">
          <p>{contagem}</p>
        </div>
      </div>
      <div className="grupo-cards"></div>
      <button className="card-botao">+ Novo Card</button>
    </div>
  );
}

export default Grupo;

import { useState } from "react";
import "./styles.css";
import { useAppStore } from "../../store/appStore";

function BotaoGrupo({}) {
  const [novoGrupoTitulo, setNovoGrupoTitulo] = useState("");
  const [criando, setCriando] = useState(false);

  const { createGrupo } = useAppStore();

  const handleCreateGrupo = async () => {
    if (!novoGrupoTitulo.trim()) return;
    setCriando(false);
    setNovoGrupoTitulo("");
    await createGrupo(novoGrupoTitulo);
  };

  return (
    <div className="botao-container">
      {criando ? (
        <div>
          <input
            type="text"
            className="input-novo-grupo"
            value={novoGrupoTitulo}
            onChange={(e) => setNovoGrupoTitulo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setCriando(false);
              if (e.key === "Enter") handleCreateGrupo();
            }}
            onBlur={() => setCriando(false)}
            placeholder="Nome do Grupo"
            autoFocus
          />
        </div>
      ) : (
        <button onClick={() => setCriando(true)} className="btn-novo-grupo">
          + Novo Grupo
        </button>
      )}
    </div>
  );
}
export default BotaoGrupo;

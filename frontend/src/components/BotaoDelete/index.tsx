interface BotaoDeleteProps {
  className?: string;
  evento: () => void;
}

function BotaoDelete({ className, evento }: BotaoDeleteProps) {
  const estilo = {
    background: "transparent",
    border: "none",
    fontWeight: "lighter",
    color: "#424a5a",
    padding: "2px 6px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <button
      className={className}
      style={estilo}
      title="Excluir grupo"
      onClick={evento}
    >
      ✕
    </button>
  );
}

export default BotaoDelete;

// deleteGrupo(grupo.id)}

import "./styles.css";

type TarefaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  setValue: (v: string) => void;
  dateValue: string;
  setDateValue: (v: string) => void;
  onSave: () => void;
  loading?: boolean;
};

export default function TarefaModal({
  isOpen,
  onClose,
  value,
  setValue,
  dateValue,
  setDateValue,
  onSave,
  loading,
}: TarefaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-container">
        <button
          className="modal-deletar-botao"
          title="Fechar modal"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="form-tarefa">
          <label>Descrição da atividade</label>
          <textarea
            placeholder="Digite a descrição da atividade..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-data">
          <label>Data de Entrega</label>
          <input
            type="date"
            title="text"
            className="form-data"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn-salvar"
          onClick={onSave}
          disabled={!value.trim() || loading}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

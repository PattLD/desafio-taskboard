import "./styles.css";

type TarefaModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TarefaModal({ isOpen, onClose }: TarefaModalProps) {
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
          <textarea placeholder="Digite a descrição da atividade..." />
        </div>
        <div className="form-data">
          <label>Data de Entrega</label>
          <input type="date" title="text" className="form-data" />
        </div>
        <button type="button" className="btn-salvar">
          Salvar
        </button>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import BotaoDelete from "../BotaoDelete";
import "./styles.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  children: ReactNode;
  onSave: () => void;
  disableBotaoSalvar?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  loading,
  children,
  onSave,
  disableBotaoSalvar,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-container">
        <BotaoDelete className="modal-deletar-btn" evento={onClose} />
        {children}
        <button
          type="button"
          className="btn-salvar"
          onClick={onSave}
          disabled={disableBotaoSalvar || loading}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

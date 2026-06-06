import { useTarefaATrasada } from "../../hooks/useTarefaAtrasada";
import "./styles.css";
import { MdNotifications } from "react-icons/md";

export function Notificacao() {
  const contagemATrasada = useTarefaATrasada();

  return (
    <div className="notif-container">
      {contagemATrasada <= 0 ? (
        <div className="notif-vazia" title="Nenhuma atividade em atraso">
          <MdNotifications />
        </div>
      ) : (
        <div className="notif-aviso">
          <MdNotifications />
          {contagemATrasada === 1 ? (
            <p>{contagemATrasada} atividade em atraso</p>
          ) : (
            <p>{contagemATrasada} atividades em atraso</p>
          )}
          <div className="notif-circulo">{contagemATrasada}</div>
        </div>
      )}
    </div>
  );
}

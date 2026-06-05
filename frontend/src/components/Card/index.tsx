import "./styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";

interface CardProps {
  id: string;
  grupoId: string;
  titulo: string;
  prazo: string;
  completado: boolean;
}

function Card({ id, grupoId, titulo, prazo, completado = false }: CardProps) {
  return (
    <div className="card-container" style={{ borderLeft: "6px solid #4d8df4" }}>
      <p className="tarefa-texto">{titulo}</p>
      <div className="card-footer">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox-status"
          defaultChecked={completado}
        />
        <div className="data">
          <MdOutlineCalendarToday size={13} />
          <p>{prazo}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

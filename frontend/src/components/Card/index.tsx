import "./styles.css"
import { MdOutlineCalendarToday } from "react-icons/md";

interface CardProps {
    tarefa: string
    prazo: string
}

function Card ({tarefa, prazo} : CardProps) {
    return (
        <div className="card-container" style={{borderLeft: '6px solid #4d8df4'}}>
            <p className="tarefa-texto">{tarefa}</p>
            <div className="card-footer">
                <input type="checkbox" name="checkbox" id="checkbox-status"/>
                <div className="data">   
                    <MdOutlineCalendarToday size={13}/>
                    <p>{prazo}</p>
                </div>
            </div>
        </div>
    );
}

export default Card
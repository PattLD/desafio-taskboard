import './styles.css'
import Card from '../Card'
import type { GrupoData } from '../../interface/GrupoData';
import { useState } from 'react';

interface GrupoProps {
    grupo: GrupoData;
}

function Grupo({grupo} : GrupoProps) {
    const contagem = 6
    const [titulo, setTitulo] = useState(grupo?.titulo ?? "");

  return (
    <div className='grupo-container'>
        <div className='grupo-header'>
            <h2 className='grupo-titulo'>{titulo}</h2> 
            <div className='grupo-contagem'>
                <p>{contagem}</p>
            </div>   
        </div>
        <div className='grupo-cards'>
            
        </div>
        <button className='card-botao'>+ Novo Card</button>

    </div> 
  )
}

export default Grupo


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
            <Card tarefa='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse blanditiis ducimus beatae cum, odio at iusto exercitationem nesciunt modi, architecto distinctio voluptatem dicta aliquam nam. Quae illum voluptatem quia incidunt.' prazo='12/06'/>
            <Card tarefa='Fazer botão grupo' prazo='23/10'/>
        </div>
        <button className='card-botao'>+ Novo Card</button>

    </div> 
  )
}

export default Grupo


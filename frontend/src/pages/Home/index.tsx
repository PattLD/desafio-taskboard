import './styles.css'
import { FaSquareCheck } from "react-icons/fa6";
import BarraPesquisa from '../../components/BarraPesquisa'
import Grupo from '../../components/Grupo';
import { useGrupoStore } from '../../store/grupoStore';
import { useEffect } from 'react';
import BotaoGrupo from '../../components/BotaoGrupo';

function Home() {
  const {
    grupos, 
    carregando, 
    listarGrupos
  } = useGrupoStore();

  useEffect(() => {
    listarGrupos();
  }, [listarGrupos]);

  return (
    <>
      <div className='header'>
        <FaSquareCheck size={28} color='#1275d1'/>
        <h1 className='title'>TaskBoard</h1> 
        <BarraPesquisa/>
      </div>
      <div className='container'>
        <div className='lista-grupos'>
          {!carregando && grupos.map((grupo) => (
              <div key={grupo.id}> 
                <Grupo grupo={grupo} /> 
              </div>
          ))}
          <BotaoGrupo/>
        </div>
      </div>

    </>
  )
}

export default Home

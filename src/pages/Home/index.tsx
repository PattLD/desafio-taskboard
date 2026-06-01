import './styles.css'
import { FaSquareCheck } from "react-icons/fa6";
import BarraPesquisa from '../../components/BarraPesquisa'
import Grupo from '../../components/Grupo';

function Home() {
  return (
    <>
      <div className='header'>
        <FaSquareCheck size={28} color='#1275d1'/>
        <h1 className='title'>TaskBoard</h1> 
        <BarraPesquisa/>
      </div>
      <div className='container'>
        <Grupo titulo={'Em Andamento'} contagem={8}/>
      </div>

    </>
  )
}

export default Home

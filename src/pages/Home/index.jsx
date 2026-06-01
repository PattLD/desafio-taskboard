import './styles.css'
import BarraPesquisa from '../../components/BarraPesquisa'
import { FaSquareCheck } from "react-icons/fa6";

function Home() {
  return (
    <>
      <div className='header'>
        <FaSquareCheck size={28} color='#1275d1'/>
        <h1 className='title'>TaskBoard</h1> 
        <BarraPesquisa/>
      </div>
      <div className='container'>
      </div>

    </>
  )
}

export default Home

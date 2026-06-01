import { FaSearch } from "react-icons/fa";
import './styles.css'

function BarraPesquisa() {
  return (
    <div className='pesquisa-container'>
        <FaSearch color='#74747c' size={12}/>
        <input className='pesquisa-input' name='pesquisa' placeholder='Localizar atividade...' type='text' />
    </div>
    
  )
}

export default BarraPesquisa
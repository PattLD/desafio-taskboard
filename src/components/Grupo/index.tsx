import './styles.css'

interface GrupoProps {
    titulo: string,
    contagem: number
}

function Grupo({titulo, contagem} : GrupoProps) {
  return (
    <div className='grupo-container'>
        <div className='grupo-header'>
            <h2 className='grupo-titulo'>{titulo}</h2> 
            <div className='grupo-contagem'>
                <p>{contagem}</p>
            </div>   
        </div>
        <div>
            <button className='card-botao'>+ Novo Card</button>
        </div>

    </div> 
  )
}

export default Grupo
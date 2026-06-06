import { FaSearch } from "react-icons/fa";
import "./styles.css";
import { useAppStore } from "../../store/appStore";

function BarraPesquisa() {
  const pesquisaTarefa = useAppStore((s) => s.pesquisaTarefa);
  const setPesquisaTarefa = useAppStore((s) => s.setPesquisaTarefa);

  return (
    <div className="pesquisa-container">
      <FaSearch color="#74747c" size={12} />
      <input
        className="pesquisa-input"
        name="pesquisa"
        value={pesquisaTarefa}
        onChange={(e) => {
          setPesquisaTarefa(e.target.value);
        }}
        placeholder="Localizar atividade..."
        type="text"
      />
    </div>
  );
}

export default BarraPesquisa;

import "./styles.css";

type TarefaModalProps = {
  dateValue: string;
  setDateValue: (v: string) => void;
};

export default function FormDate({
  dateValue,
  setDateValue,
}: TarefaModalProps) {
  return (
    <div className="form-data">
      <label>Data de Entrega</label>
      <input
        type="date"
        title="text"
        className="form-data"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
    </div>
  );
}

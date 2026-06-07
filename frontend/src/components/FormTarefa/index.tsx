import "./styles.css";

type TarefaModalProps = {
  value: string;
  setValue: (v: string) => void;
};

export default function FormTarefa({ value, setValue }: TarefaModalProps) {
  return (
    <div className="form-tarefa">
      <label>Descrição da atividade</label>
      <textarea
        placeholder="Digite a descrição da atividade..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
    </div>
  );
}

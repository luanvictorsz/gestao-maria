import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Tasks() {
  const { tarefas, addTarefa, toggleTarefa } = useApp();
  const [titulo, setTitulo] = useState("");

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <div className="tasks">
      <h2>Tarefas</h2>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={() => { addTarefa(titulo); setTitulo(""); }}>
        Adicionar
      </button>

      <ul>
        {tarefas
          .filter((t) => t.data.slice(0, 10) === hoje)
          .map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.concluido}
                onChange={() => toggleTarefa(t.id)}
              />
              {t.titulo}
            </li>
          ))}
      </ul>
    </div>
  );
}
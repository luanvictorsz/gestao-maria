import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Status } from "../types";
import ClientCard from "./ClientCard";

const columns: { label: string; value: Status }[] = [
  { label: "Novo", value: "novo" },
  { label: "Atendimento", value: "atendimento" },
  { label: "Aguardando", value: "aguardando" },
  { label: "Follow-up", value: "followup" },
  { label: "Fechado", value: "fechado" },
];

export default function Pipeline() {
  const { clientes, addCliente } = useApp();
  const [nome, setNome] = useState("");

  return (
    <div className="pipeline">
      <h2>Pipeline</h2>

      <div>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Novo cliente"
        />
        <button onClick={() => { addCliente(nome); setNome(""); }}>
          Adicionar
        </button>
      </div>

      <div className="columns">
        {columns.map((col) => (
          <div key={col.value} className="column">
            <h3>{col.label}</h3>

            {clientes
              .filter((c) => c.status === col.value)
              .map((c) => (
                <ClientCard key={c.id} cliente={c} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
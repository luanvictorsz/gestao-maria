import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Status } from "../Types";
import ClientCard from "./ClientCard";

const columns: { label: string; value: Status }[] = [
  { label: "Novo", value: "novo" },
  { label: "Atendimento", value: "atendimento" },
  { label: "Aguardando", value: "aguardando" },
  { label: "Follow-up", value: "followup" },
  { label: "Fechado", value: "fechado" },
];

export default function Pipeline() {
  const { clientes, addCliente, moverCliente } = useApp();
  const [nome, setNome] = useState("");

  return (
    <div className="pipeline">
      <h2>Bem Vinda - Maria Paula</h2>

      <div>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Novo cliente"
        />
        <button
          onClick={() => {
            if (!nome.trim()) return;
            addCliente(nome);
            setNome("");
          }}
        >
          Adicionar
        </button>
      </div>

      <div className="columns">
        {columns.map((col) => (
          <div
            key={col.value}
            className="column"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("drag-over");
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("drag-over");
            }}
            onDrop={(e) => {
              e.currentTarget.classList.remove("drag-over");

              const id = e.dataTransfer.getData("clienteId");
              if (!id) return;

              moverCliente(id, col.value);
            }}
          >
            <h3>{col.label}</h3>

            {(clientes || [])
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
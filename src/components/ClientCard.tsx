import { Cliente, Status } from "../Types";
import { useApp } from "../context/AppContext";

const next: Record<Status, Status | null> = {
  novo: "atendimento",
  atendimento: "aguardando",
  aguardando: "followup",
  followup: "fechado",
  fechado: null,
};

export default function ClientCard({ cliente }: { cliente: Cliente }) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("clienteId", cliente.id);
      }}
    >
      <p>{cliente.nome}</p>
    </div>
  );
}
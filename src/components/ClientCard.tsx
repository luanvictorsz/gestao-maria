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
  const { moverCliente } = useApp();

  return (
    <div className="card">
      <p>{cliente.nome}</p>

      {next[cliente.status] && (
        <button onClick={() => moverCliente(cliente.id, next[cliente.status]!)}>
          Avançar
        </button>
      )}
    </div>
  );
}
import { useState } from "react";
import { useApp } from "../context/AppContext";
import ConfirmModal from "./ConfirmModal";
import { Cliente } from "../Types";

export default function ClientCard({ cliente }: { cliente: Cliente }) {
  const { removeCliente } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="card"
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData("clienteId", cliente.id)
        }
      >
        <div className="card-header">
          <p>{cliente.nome}</p>

          <button
            className="delete-btn"
            onClick={() => setOpen(true)}
          >
            ✖
          </button>
        </div>
      </div>

      <ConfirmModal
        open={open}
        message={`Remover ${cliente.nome}?`}
        onConfirm={() => {
          removeCliente(cliente.id);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
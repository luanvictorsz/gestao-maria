import { createContext, useContext, useEffect, useState } from "react";
import { Cliente, Tarefa, Status } from "../types";

interface AppContextType {
  clientes: Cliente[];
  tarefas: Tarefa[];
  addCliente: (nome: string) => void;
  moverCliente: (id: string, status: Status) => void;
  addTarefa: (titulo: string) => void;
  toggleTarefa: (id: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: any) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const c = localStorage.getItem("clientes");
    const t = localStorage.getItem("tarefas");
    if (c) setClientes(JSON.parse(c));
    if (t) setTarefas(JSON.parse(t));
  }, []);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [clientes, tarefas]);

  useEffect(() => {
    const novas: Tarefa[] = [];

    clientes.forEach((c) => {
      const dias = (Date.now() - c.ultimaInteracao) / (1000 * 60 * 60 * 24);

      if (c.status === "followup" && dias > 2) {
        const existe = tarefas.some(
          (t) => t.clienteId === c.id && t.titulo.includes("Follow-up")
        );

        if (!existe) {
          novas.push({
            id: crypto.randomUUID(),
            titulo: `Follow-up: ${c.nome}`,
            data: new Date().toISOString(),
            clienteId: c.id,
            concluido: false,
          });
        }
      }
    });

    if (novas.length) {
      setTarefas((prev) => [...prev, ...novas]);
    }
  }, [clientes]);

  const addCliente = (nome: string) => {
    setClientes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        nome,
        status: "novo",
        ultimaInteracao: Date.now(),
      },
    ]);
  };

  const moverCliente = (id: string, status: Status) => {
    setClientes((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status, ultimaInteracao: Date.now() }
          : c
      )
    );
  };

  const addTarefa = (titulo: string) => {
    setTarefas((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        titulo,
        data: new Date().toISOString(),
        concluido: false,
      },
    ]);
  };

  const toggleTarefa = (id: string) => {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, concluido: !t.concluido } : t
      )
    );
  };

  return (
    <AppContext.Provider
      value={{ clientes, tarefas, addCliente, moverCliente, addTarefa, toggleTarefa }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
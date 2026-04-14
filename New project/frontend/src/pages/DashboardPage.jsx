import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const initialForm = {
  title: "",
  description: "",
};

export function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await apiRequest("/tasks");
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (editingTaskId) {
        await apiRequest(`/tasks/${editingTaskId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest("/tasks", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      setForm(initialForm);
      setEditingTaskId(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(taskId) {
    try {
      await apiRequest(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      await apiRequest(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ done: !task.done }),
      });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description || "",
    });
  }

  function handleCancelEdit() {
    setEditingTaskId(null);
    setForm(initialForm);
  }

  return (
    <section className="dashboard">
      <div className="panel">
        <h2>{editingTaskId ? "Editar tarefa" : "Nova tarefa"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Titulo"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
          />
          <textarea
            rows="4"
            placeholder="Descricao"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
          <button type="submit">
            {editingTaskId ? "Atualizar tarefa" : "Criar tarefa"}
          </button>

          {editingTaskId && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancelEdit}
            >
              Cancelar edicao
            </button>
          )}
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="panel">
        <h2>Minhas tarefas</h2>

        {tasks.length === 0 ? (
          <p className="status-message">
            Nenhuma tarefa cadastrada no momento.
          </p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article key={task.id} className="task-card">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || "Sem descricao."}</p>
                </div>

                <div className="task-meta">
                  <span className={task.done ? "badge done" : "badge pending"}>
                    {task.done ? "Concluida" : "Pendente"}
                  </span>
                </div>

                <div className="task-actions">
                  <button onClick={() => handleToggle(task)}>
                    {task.done ? "Marcar pendente" : "Concluir"}
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    className="secondary-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="danger-button"
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


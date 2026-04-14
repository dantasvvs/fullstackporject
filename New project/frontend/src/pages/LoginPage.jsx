import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await signIn(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-card">
      <h2>Entrar</h2>
      <p>Acesse sua conta para gerenciar tarefas.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
        />
        <button type="submit">Entrar</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p>
        Ainda nao tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </section>
  );
}


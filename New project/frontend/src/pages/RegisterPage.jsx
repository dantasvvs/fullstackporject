import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await signUp(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-card">
      <h2>Criar conta</h2>
      <p>Cadastre-se para acessar o CRUD protegido.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
        />
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
        <button type="submit">Cadastrar</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p>
        Ja possui conta? <Link to="/login">Fazer login</Link>
      </p>
    </section>
  );
}


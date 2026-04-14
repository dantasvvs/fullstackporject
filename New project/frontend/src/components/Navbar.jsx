import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h1>TaskFlow</h1>
        <span>Organize suas tarefas com autenticacao</span>
      </div>

      <nav className="navbar-actions">
        {user ? (
          <>
            <span>Ola, {user.name}</span>
            <button onClick={signOut} className="secondary-button">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  );
}


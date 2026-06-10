import { Link, Outlet } from "react-router-dom";
import "./App.layout.css";
import { useGameContext } from '@/hooks/useGameContext';


export function AppLayout() {

  const { player, logout } = useGameContext();

  return (
    <div className="app">
      <h1 className="title">
        PROJETO INTEGRADOR 5: APLICAÇÕES DE INTELIGÊNCIA ARTIFICIAL
      </h1>

      <nav className="menu">
        <Link to="/watch" className="menu-button">
          Jogos
        </Link>

        <Link to="/player" className="menu-button">
          Player
        </Link>
      </nav>

      <main className="main-panel">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 PI5.</p>
      </footer>
    </div>
  );
}
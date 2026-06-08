import { Link } from "react-router-dom";
import "./App.layout.css";
import { Outlet } from "react-router-dom";


export function AppLayout() {
  return (
    <div className="layout">
      <header className="header">
        <h1>PI5</h1>
      </header>

      <nav className="menu">
        <Link to="/" className="menu-button">
          🏠 Home
        </Link>

        <Link to="/watch/:id" className="menu-button">
          🎮 Game
        </Link>

        <Link to="/player" className="menu-button">
          👤 Player
        </Link>

        <Link to="/watch" className="menu-button">
          👁 Watch
        </Link>
      </nav>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 PI5.</p>
      </footer>
    </div>
  );
}
import { Link, Outlet } from "react-router";

import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        PROJETO INTEGRADOR 5: APLICAÇÕES DE INTELIGÊNCIA ARTIFICIAL
      </h1>

      <nav className={styles.menu}>
        <Link to="/" className={styles.menuButton}>
          Jogos
        </Link>

        <Link to="/player" className={styles.menuButton}>
          Player
        </Link>
      </nav>

      <main className={styles.mainPanel}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 PI5.</p>
      </footer>
    </div>
  );
}

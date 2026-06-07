import {Link} from "react-router-dom";

export function AppLayout({ children = null }) {
return (
    <div>
      <header>
       <h1>PI5</h1>
      </header>
      <nav style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
        <Link to="/">Home</Link>
        <Link to="/watch">Watch</Link>
      </nav>
      <hr />
      <main>{children}</main>
      <hr />
      <footer>
        <p>&copy; 2026 PI5.</p>
      </footer>
    </div>
  );
}


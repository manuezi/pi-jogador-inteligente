import { useState } from "react";
import { Link } from "react-router";

import styles from "./Home.module.css";

export function Home() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className={styles.container}>
      <div>Home</div>

      <input
        type="text"
        placeholder="GitHub User"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Link to={`/users/${userInput}`}>Pesquisar</Link>
    </div>
  );
}

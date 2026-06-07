import { useState } from "react";
import { Link } from "react-router";

import styles from "./Home.module.css";

export function Home() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
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

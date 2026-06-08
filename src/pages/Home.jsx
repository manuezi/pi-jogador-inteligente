import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";

export function Home() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className={styles.container}>
    </div>
  );
}

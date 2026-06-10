import { useParams } from "react-router";

import { SpectateGame } from "@/components/specific";
import styles from "./Game.module.css";

export function Game() {
  const { gameId } = useParams();

  return (
    <div className={styles.gamePage}>
      <div className={styles.gameHeader}>
        <h1 className={styles.gameTitle}>🎮 Assistindo Partida</h1>

        <div className={styles.gameId}>#{gameId}</div>
      </div>

      <SpectateGame gameId={gameId} />
    </div>
  );
}

import { useGameContext, useGameSocket } from "@/hooks";
import { Board } from "@/components/specific";
import styles from "./ViewGame.module.css";

export function ViewGame({ gameId }) {
  const { spectator } = useGameContext();
  const { connected, gameState } = useGameSocket(
    gameId,
    spectator?.[gameId]?.spectator_access_token || null,
  );

  //console.log("GAME STATE:", gameState);

  return (
    <div className={styles.viewGameContainer}>
      <div className={styles.viewGameCard}>
        <div className={styles.viewGameHeader}>
          <h2 className={styles.viewGameTitle}>Transmissão Ao Vivo</h2>

          <span
            className={
              connected
                ? `${styles.statusBadge} ${styles.online}`
                : `${styles.statusBadge} ${styles.offline}`
            }
          >
            {connected ? "🟢 Conectado" : "🟡 Conectando..."}
          </span>
        </div>

        <div className={styles.gameInfoBox}>
          <p>
            <strong>ID da Partida</strong>
          </p>

          <span>{gameId}</span>
        </div>

        {gameState && (
          <>
            <div className={styles.gameInfoBox}>
              <p>
                <strong>Status</strong>
              </p>

              <span>{gameState.status}</span>
            </div>

            <div className={styles.boardWrapper}>
              <Board
                board={gameState.board}
                turingProfessor={gameState.turing_player?.ai_player_name}
                lovelaceProfessor={gameState.lovelace_player?.ai_player_name}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

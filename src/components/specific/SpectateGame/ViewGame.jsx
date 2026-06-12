import { useGameContext, useGameSocket } from "@/hooks";
import { Board } from "@/components/specific";
import styles from "./ViewGame.module.css";

export function ViewGame({ gameId }) {
  const { spectator } = useGameContext();
  const { connected, gameState } = useGameSocket(
    gameId,
    spectator?.[gameId]?.spectator_access_token || null,
  );

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
              <Board board={gameState.board} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

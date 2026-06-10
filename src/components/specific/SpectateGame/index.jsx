import { useGameContext } from "@/hooks";
import { SpectatorRegisterForm } from "@/components/specific";
import { ViewGame } from "./ViewGame";
import styles from "./index.module.css";

export function SpectateGame({ gameId }) {
  const { spectator, logoutSpectator } = useGameContext();

  return (
    <>
      {!spectator && (
        <div className={styles.spectatorContainer}>
          <div className={styles.spectatorCard}>
            <div className={styles.spectatorIcon}>👀</div>

            <h2 className={styles.spectatorTitle}>Assistir Partida</h2>

            <p className={styles.spectatorDescription}>
              Para acompanhar esta partida em tempo real, registre-se como
              espectador preenchendo as informações abaixo.
            </p>

            <SpectatorRegisterForm gameId={gameId} />
          </div>
        </div>
      )}

      {spectator && (
        <div className={styles.spectatorView}>
          <ViewGame gameId={gameId} />

          <div className={styles.spectatorFooter}>
            <button
              onClick={() => logoutSpectator(gameId)}
              className={styles.leaveSpectatorButton}
            >
              🚪 Sair da partida
            </button>
          </div>
        </div>
      )}
    </>
  );
}

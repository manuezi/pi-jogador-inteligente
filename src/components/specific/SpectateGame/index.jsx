import { useEffect, useRef } from "react";
import { useGameContext, useAddSpectator } from "@/hooks";
import { ViewGame } from "./ViewGame";
import styles from "./index.module.css";

export function SpectateGame({ gameId }) {
  const { spectator, setSpectator, logoutSpectator, player } = useGameContext();
  const { addSpectator, isLoading } = useAddSpectator();
  const registrationAttempted = useRef(false);

  const currentSpectator = spectator?.[gameId];

  useEffect(() => {
    async function autoRegister() {
      if (!currentSpectator && !registrationAttempted.current && !isLoading) {
        registrationAttempted.current = true;
        try {
          const payload = {
            spectator_name: player?.ai_player_name || "Espectador Anônimo",
            spectator_avatar:
              player?.ai_player_avatar || "https://picsum.photos/200",
          };
          const newSpectator = await addSpectator(gameId, payload);
          setSpectator(newSpectator);
        } catch (err) {
          console.error("Erro ao registrar espectador automaticamente:", err);
        }
      }
    }

    autoRegister();
  }, [gameId, currentSpectator, player, addSpectator, setSpectator, isLoading]);

  if (!currentSpectator) {
    return (
      <div className={styles.spectatorContainer}>
        <div className={styles.spectatorCard}>
          <div className={styles.spectatorIcon}>⏳</div>
          <h2 className={styles.spectatorTitle}>Aguarde...</h2>
          <p className={styles.spectatorDescription}>
            Iniciando conexão com a partida...
          </p>
        </div>
      </div>
    );
  }

  return (
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
  );
}

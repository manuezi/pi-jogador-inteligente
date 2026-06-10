import { useState } from "react";

import { useGetGame } from "@/hooks";
import styles from "./GameDetails.module.css";
import { useParams } from "react-router";

export function GameDetails() {
  const { gameId } = useParams();
  const { data: game, isLoading } = useGetGame(gameId);
  const [showLog, setShowLog] = useState(false);

  if (isLoading) {
    return <h2>Carregando resultado...</h2>;
  }

  if (!game) {
    return <h2>Partida não encontrada.</h2>;
  }

  const winner =
    game.winner_team === 1 ? game.turing_player : game.lovelace_player;

  return (
    <div className={styles.resultPage}>
      <h1 className={styles.resultTitle}>Resultado da Partida</h1>

      <div className={styles.winnerCard}>
        <h3 className={styles.resultTitle}>
          🏆 Vencedor:{" "}
          <strong>{winner?.ai_player_name || "Não informado"}</strong>
        </h3>
      </div>
      <br />

      <div className={styles.resultCard}>
        <div className={styles.resultSection}>
          <h2>ID</h2>
          <p>{game.id}</p>
        </div>

        <div className={styles.resultSection}>
          <h2>Total de Turnos</h2>
          <p>{game.current_turn_number}</p>
        </div>
      </div>

      <div className={styles.playersGrid}>
        <div className={styles.playerResultCard}>
          <img src={game.lovelace_player?.ai_player_avatar} alt="" />

          <h2>{game.lovelace_player?.ai_player_name}</h2>

          <p>Grupo: {game.lovelace_player?.group_name}</p>

          <p>{game.lovelace_player?.ai_player_description}</p>
        </div>

        <div className={styles.playerResultCard}>
          <img src={game.turing_player?.ai_player_avatar} alt="" />

          <h2>{game.turing_player?.ai_player_name}</h2>

          <p>Grupo: {game.turing_player?.group_name}</p>

          <p>{game.turing_player?.ai_player_description}</p>
        </div>
      </div>

      <button className={styles.logButton} onClick={() => setShowLog(!showLog)}>
        {showLog ? "📕 Ocultar Dados da Partida" : "📖 Ver Dados da Partida"}
      </button>

      {showLog && (
        <div className={styles.logContainer}>
          <pre className={styles.gameLog}>{JSON.stringify(game, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

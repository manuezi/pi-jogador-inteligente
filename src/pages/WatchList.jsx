import { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  useListGames,
  useJoinGame,
  useAddSpectator,
  useGameContext,
} from "@/hooks";
import styles from "./WatchList.module.css";

export function WatchListPage() {
  const navigate = useNavigate();
  const { player, setSpectator } = useGameContext();

  const { data, isLoading, error } = useListGames();
  const { joinGame, isLoading: isJoining } = useJoinGame();
  const { addSpectator } = useAddSpectator();
  const [statusFiltro, setStatusFiltro] = useState("ALL");

  const partidas = data?.items || [];
  const partidasFiltradas =
    statusFiltro === "ALL"
      ? partidas
      : partidas.filter((partida) => partida.status === statusFiltro);

  const handleJoin = async (gameId, turingPlayer) => {
    if (!player) {
      alert(
        "Você precisa estar logado como jogador para entrar em uma partida.",
      );
      return;
    }

    // Determina qual slot está livre
    const team_slot = !turingPlayer ? 1 : 2;

    try {
      await joinGame(gameId, {
        player_id: player.id,
        team_slot,
      });

      // Auto-registra como espectador antes de navegar
      try {
        const spec = await addSpectator(gameId, {
          spectator_name: player.ai_player_name,
          spectator_avatar: player.ai_player_avatar,
        });
        setSpectator(spec);
      } catch (specErr) {
        console.error("Falha ao registrar espectador no join:", specErr);
      }

      navigate(`/watch/${gameId}`);
    } catch (err) {
      alert("Erro ao entrar na partida: " + err.message);
    }
  };

  return (
    <div className={styles.watchContainer}>
      <div className={styles.watchFilters}>
        <button
          className={statusFiltro === "FINISHED" ? styles.active : ""}
          onClick={() => setStatusFiltro("FINISHED")}
        >
          Finished
        </button>

        <button
          className={statusFiltro === "PAUSED" ? styles.active : ""}
          onClick={() => setStatusFiltro("PAUSED")}
        >
          Paused
        </button>

        <button
          className={statusFiltro === "WAITING_PLAYERS" ? styles.active : ""}
          onClick={() => setStatusFiltro("WAITING_PLAYERS")}
        >
          Waiting for players
        </button>

        <button
          className={statusFiltro === "PLAYING" ? styles.active : ""}
          onClick={() => setStatusFiltro("PLAYING")}
        >
          Playing
        </button>

        <button
          className={statusFiltro === "ALL" ? styles.active : ""}
          onClick={() => setStatusFiltro("ALL")}
        >
          Todas
        </button>
      </div>

      <div className={styles.watchHeader}>
        <h1 className={styles.watchTitle}>PARTIDAS</h1>
        <Link to="/create-match" className={styles.createButton}>
          + Criar Partida
        </Link>
      </div>
      {isLoading && <h3>Carregando partidas...</h3>}
      {error && <h3>Erro ao carregar partidas: {error.message}</h3>}
      <div>
        <div className={styles.watchCounter}>
          Total de partidas: <span>{partidasFiltradas.length}</span>
        </div>
        <br />
        {partidasFiltradas.map((partida) => (
          <div className={styles.gameCard} key={partida.id}>
            <div className={styles.gameInfo}>
              <p>ID: {partida.id}</p>

              <p>Turno: {partida.current_turn_number}</p>

              <p>
                Lovelace:{" "}
                {partida.lovelace_player?.ai_player_name || "Aguardando..."}
              </p>

              <p>
                Turing:{" "}
                {partida.turing_player?.ai_player_name || "Aguardando..."}
              </p>
            </div>

            <div className={styles.actions}>
              {partida.status === "FINISHED" ? (
                <Link
                  to={`/results/${partida.id}`}
                  className={styles.detailsButton}
                >
                  Ver Resultado
                </Link>
              ) : partida.status === "WAITING_PLAYERS" ? (
                <button
                  onClick={() => handleJoin(partida.id, partida.turing_player)}
                  disabled={isJoining}
                  className={styles.joinButton}
                >
                  {isJoining ? "Entrando..." : "Entrar na partida"}
                </button>
              ) : (
                <Link
                  to={`/watch/${partida.id}`}
                  className={styles.watchButton}
                >
                  Assistir partida
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

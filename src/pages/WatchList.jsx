import { useState } from "react";
import { Link } from "react-router";

import { useListGames } from "@/hooks";
import styles from "./WatchList.module.css";

export function WatchListPage() {
  const { data, isLoading, error } = useListGames();
  const [statusFiltro, setStatusFiltro] = useState("ALL");

  const partidas = data?.items || [];
  const partidasFiltradas =
    statusFiltro === "ALL"
      ? partidas
      : partidas.filter((partida) => partida.status === statusFiltro);

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
          className={
            statusFiltro === "WAITING_FOR_PLAYERS" ? styles.active : ""
          }
          onClick={() => setStatusFiltro("WAITING_FOR_PLAYERS")}
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

              <p>Lovelace: {partida.lovelace_player?.ai_player_name}</p>

              <p>Turing: {partida.turing_player?.ai_player_name}</p>
            </div>

            {partida.status === "FINISHED" ? (
              <Link
                to={`/results/${partida.id}`}
                className={styles.detailsButton}
              >
                Ver Resultado
              </Link>
            ) : (
              <Link to={`/watch/${partida.id}`} className={styles.watchButton}>
                Assistir partida
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { cn } from "@/components/specific/helpers";
import { Typography } from '@/pages/text/Typography';
import { useEffect, useState } from "react";
import { listGames } from "@/components/specific/feature/api";
import "./Watch.css";
import { GameFinished } from "@/pages/GameFinished";

export function WatchListPage() {
  
  const [statusFiltro, setStatusFiltro] = useState("ALL");
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const partidasFiltradas =
  statusFiltro === "ALL"
      ? partidas
      : partidas.filter(
          (partida) => partida.status === statusFiltro
        );

  async function buscarPartidas() {
    setLoading(true);

    try {
      const response = await listGames();
      setPartidas(response.items);
    } 
    catch (error) {
      console.error(error);
      setError(error);
    }
    finally {
      setLoading(false);
    }
    
  }

    useEffect(() => {
    buscarPartidas();
  }, []);

  return (
  <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>
      <div className="watch-filters">
      <button
        className={statusFiltro === "FINISHED" ? "active" : ""}
        onClick={() => setStatusFiltro("FINISHED")}
      >
        Finished
      </button>

      <button
        className={statusFiltro === "PAUSED" ? "active" : ""}
        onClick={() => setStatusFiltro("PAUSED")}
      >
        Paused
      </button>

      <button
        className={statusFiltro === "WAITING_FOR_PLAYERS" ? "active" : ""}
        onClick={() => setStatusFiltro("WAITING_FOR_PLAYERS")}
      >
        Waiting for players
      </button>

      <button
        className={statusFiltro === "PLAYING" ? "active" : ""}
        onClick={() => setStatusFiltro("PLAYING")}
      >
        Playing
      </button>

      <button
        className={statusFiltro === "ALL" ? "active" : ""}
        onClick={() => setStatusFiltro("ALL")}
      >
        Todas
      </button>
    </div>

    <div className="watch-header">
      <Typography
        variant="h1"
        asTag="h1"
        className="watch-title"
      >
        PARTIDAS
      </Typography></div>
        {loading && <h3>Carregando partidas...</h3>}
        {error && <h3>Erro ao carregar partidas: {error.message}</h3>}
        <div>
      <div className="watch-counter">
        Total de partidas: <span>{partidasFiltradas.length}</span>
      </div>
    <br/>
      {partidasFiltradas.map((partida) => (
        <div className="game-card" key={partida.id}>
      <div className="game-info">
        <p>ID: {partida.id}</p>

        <p>Turno: {partida.current_turn_number}</p>

        <p>
          Lovelace: {partida.lovelace_player?.ai_player_name}
        </p>

        <p>
          Turing: {partida.turing_player?.ai_player_name}
        </p>
      </div>

      {partida.status === "FINISHED" ? (
  <Link
    to={`/results/${partida.id}`}
    className="details-button"
  >
    Ver Resultado
  </Link>
) : (
  <Link
    to={`/watch/${partida.id}`}
    className="watch-button"
  >
    Assistir partida
  </Link>
)}
    </div>
      ))}
    </div>
  </div>
);
}
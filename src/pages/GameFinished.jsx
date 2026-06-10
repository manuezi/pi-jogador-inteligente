import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@/pages/text/Typography";
import { getGame } from "@/components/specific/feature/api";

import "./GameFinished.css";

export function GameFinished() {
  const { gameId } = useParams();

  
  const [game, setGame] = useState(null);

    const winner =
    game?.winner_team === 1
      ? game?.lovelace_player
      : game?.turing_player;
      
  const [loading, setLoading] = useState(true);
  const [showLog, setShowLog] = useState(false);
  useEffect(() => {
    async function loadGame() {
      
      try {
        const response = await getGame(gameId);


        setGame(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [gameId]);

  if (loading) {
    return <h2>Carregando resultado...</h2>;
  }

  if (!game) {
    return <h2>Partida não encontrada.</h2>;
  }

  return (
    <div className="result-page">
      <Typography
        variant="h1"
        asTag="h1"
        className="result-title"
      >
        Resultado da Partida
      </Typography>

      <div className="winner-card">
        <Typography
        variant="h3"
        asTag="h3"
        className="result-title"
      >
        🏆 Vencedor:{" "}
        <strong>
          {winner?.ai_player_name || "Não informado"}
        </strong>
      </Typography>
      </div>
      <br/>

      <div className="result-card">
        <div className="result-section">
          <h2>ID</h2>
          <p>{game.id}</p>
        </div>


        <div className="result-section">
          <h2>Total de Turnos</h2>
          <p>{game.current_turn_number}</p>
        </div>
      </div>

      <div className="players-grid">
        <div className="player-result-card">
          <img
            src={game.lovelace_player?.ai_player_avatar}
            alt=""
          />

          <h2>
            {game.lovelace_player?.ai_player_name}
          </h2>

          <p>
            Grupo: {game.lovelace_player?.group_name}
          </p>

          <p>
            {game.lovelace_player?.ai_player_description}
          </p>
        </div>

        <div className="player-result-card">
          <img
            src={game.turing_player?.ai_player_avatar}
            alt=""
          />

          <h2>
            {game.turing_player?.ai_player_name}
          </h2>

          <p>
            Grupo: {game.turing_player?.group_name}
          </p>

          <p>
            {game.turing_player?.ai_player_description}
          </p>
        </div>
      </div>

      <button
  className="log-button"
  onClick={() => setShowLog(!showLog)}
>
  {showLog
    ? "📕 Ocultar Dados da Partida"
    : "📖 Ver Dados da Partida"}
</button>

{showLog && (
  <div className="log-container">
    <pre className="game-log">
      {JSON.stringify(game, null, 2)}
    </pre>
  </div>
)}

    </div>
  );
}
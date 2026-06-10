import { useParams } from "react-router-dom";
import { Typography } from "@/pages/text/Typography";
import { SpectateGame } from "./SpectateGame";
import "./Game.css";

export function Game() {
  const { gameId } = useParams();

  return (
    <div className="game-page">
      <div className="game-header">
        <Typography
          variant="h1"
          asTag="h1"
          className="game-title"
        >
          🎮 Assistindo Partida
        </Typography>

        <div className="game-id">
          #{gameId}
        </div>
      </div>

      <SpectateGame gameId={gameId} />
    </div>
  );
}

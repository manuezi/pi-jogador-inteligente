import { useGameContext } from '@/hooks/useGameContext';
import { useGameSocket } from '@/hooks/useGameSocket';
import { Typography } from '@/pages/text/Typography';
import { cn } from '@/components/specific/helpers';

export function ViewGame({ gameId }) {
    const { spectator } = useGameContext();

    const { connected, gameState } = useGameSocket(
        gameId,
        spectator?.[gameId]?.spectator_access_token || null
    );

return (
  <div className="view-game-container">
    <div className="view-game-card">

      <div className="view-game-header">
        <Typography
          variant="h2"
          asTag="h2"
          className="view-game-title"
        >
          Transmissão Ao Vivo
        </Typography>

        <span
          className={
            connected
              ? "status-badge online"
              : "status-badge offline"
          }
        >
          {connected
            ? "🟢 Conectado"
            : "🟡 Conectando..."}
        </span>
      </div>

      <div className="game-info-box">
        <p>
          <strong>ID da Partida</strong>
        </p>

        <span>{gameId}</span>
      </div>

      {gameState && (
        <div className="game-info-box">
          <p>
            <strong>Status</strong>
          </p>

          <span>
            {gameState.status}
          </span>
        </div>
      )}
    </div>
  </div>
);}
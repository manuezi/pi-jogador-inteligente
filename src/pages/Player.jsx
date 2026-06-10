import { cn } from '@/components/specific/helpers';
import { Typography } from '@/pages/text/Typography';
import { PlayerRegisterForm } from '@/components/specific/PlayerRegisterForm';
import { PlayerUpdateForm } from '@/components/specific/PlayerUpdateForm';
import { useGameContext } from '@/hooks/useGameContext';
import "./Player.css";

export function PlayerPage() {

  const { player, logout } = useGameContext();

return (
  <div className="player-page">
    {!player && (
      <div className="player-card">
        <Typography
          variant="h1"
          asTag="h1"
          className="player-title"
        >
          Registro de Jogador
        </Typography>

        <PlayerRegisterForm />
      </div>
    )}

    {player && (
      <>
        <div className="player-card">
          <img
            src={player.ai_player_avatar}
            alt={player.ai_player_name}
            className="player-avatar"
          />

          <Typography
            variant="h1"
            asTag="h1"
            className="player-title"
          >
            {player.ai_player_name}
          </Typography>

          <span className="player-group">
            {player.group_name}
          </span>

          <button
            onClick={logout}
            className="logout-button"
          >
            Trocar Jogador
          </button>
        </div>

        <div className="info-card">
          <Typography variant="h3">
            Informações do Jogador
          </Typography>
          <br/>

          <div className="info-item">
            <strong>Grupo</strong>
            <span>{player.group_name}</span>
          </div>

          <div className="info-item">
            <strong>Nome</strong>
            <span>{player.ai_player_name}</span>
          </div>

          <div className="info-item">
            <strong>Avatar</strong>
            <span>{player.ai_player_avatar}</span>
          </div>

          <div className="info-item">
            <strong>Descrição</strong>
            <span>{player.ai_player_description}</span>
          </div>

          <div className="info-item">
            <strong>Endpoint</strong>
            <span>{player.ai_player_move_endpoint}</span>
          </div>
        </div>

        <div className="info-card">
          <Typography variant="h3">
            Atualizar Endpoint de Movimento
          </Typography>
          <br/>
          
          <PlayerUpdateForm />
        </div>
      </>
    )}
  </div>
);
}
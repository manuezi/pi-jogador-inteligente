import { Typography } from '@/pages/text/Typography';
import { useGameContext } from '@/hooks/useGameContext';
import { useEffect, useState } from "react";
import { SpectatorRegisterForm} from "@/components/specific/SpectatorRegisterForm";
import { Game } from "@/pages/Game";
import { ViewGame } from "@/pages/View-game";
import "./SpectateGame.css";

export function SpectateGame({ gameId }) {
  const { spectator: storedSpectator } = useGameContext();
  
    const [spectator, setSpectator] = useState(() => {
      if (storedSpectator ?.[gameId]) {
        return storedSpectator?.[gameId];
      }

      return null;
    });

    function logoutSpectator() {
  setSpectator((prev) => {
    const updated = { ...prev };

    delete updated[gameId];

    return updated;
  });

  setSpectator(null);
}
  
    useEffect(() => {
      if (storedSpectator?.[gameId]) {
        setSpectator(storedSpectator?.[gameId]);
      }
     }, [storedSpectator]);


return (
  <>
    {!spectator && (
      <div className="spectator-container">
        <div className="spectator-card">
          <div className="spectator-icon">
            👀
          </div>

          <Typography
            variant="h2"
            asTag="h2"
            className="spectator-title"
          >
            Assistir Partida
          </Typography>

          <Typography
            variant="p"
            className="spectator-description"
          >
            Para acompanhar esta partida em tempo real,
            registre-se como espectador preenchendo
            as informações abaixo.
          </Typography>

          <SpectatorRegisterForm gameId={gameId} />
        </div>
      </div>
    )}

{spectator && (
  <div className="spectator-view">
    <ViewGame gameId={gameId} />

    <div className="spectator-footer">
      <button
        onClick={logoutSpectator}
        className="leave-spectator-button"
      >
        🚪 Sair da partida
      </button>
    </div>
  </div>
)}
  </>
);
}
    

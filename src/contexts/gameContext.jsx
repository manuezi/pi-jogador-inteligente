import { createContext, useEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import { api } from "@/services";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext({});

export function GameContextProvider({ children }) {
  const [player, setPlayer] = useState(() => getLocalStorageItem("player"));
  const [spectator, setSpectatorData] = useState(() =>
    getLocalStorageItem("spectator"),
  );

  function setSpectator(value) {
    if (!value) return;
    setSpectatorData((prev) => ({
      ...prev,
      [value?.game_id]: value,
    }));
  }

  async function loginByToken(playerId, token) {
    try {
      setLocalStorageItem("token", token);

      const players = await api.listPlayers();
      const foundPlayer = players.find(
        (p) => String(p.id) === String(playerId),
      );

      if (!foundPlayer) {
        throw new Error("Jogador não encontrado na lista.");
      }

      const playerWithToken = { ...foundPlayer, player_access_token: token };
      setPlayer(playerWithToken);
      return playerWithToken;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  }

  function logout() {
    setPlayer(null);
    setSpectatorData(null);
  }

  function logoutSpectator(gameId) {
    setSpectatorData((prev) => {
      const updated = { ...prev };
      delete updated[gameId];

      return updated;
    });
  }

  useEffect(() => {
    if (player) {
      setLocalStorageItem("player", player);
      setLocalStorageItem("token", player.player_access_token);
    } else {
      localStorage.removeItem("player");
      localStorage.removeItem("token");
    }
  }, [player]);

  useEffect(() => {
    if (spectator) setLocalStorageItem("spectator", spectator);
    else localStorage.removeItem("spectator");
  }, [spectator]);

  return (
    <gameContext.Provider
      value={{
        player,
        setPlayer,
        spectator,
        setSpectator,
        logout,
        logoutSpectator,
        loginByToken,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

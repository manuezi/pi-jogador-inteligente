import { createContext, useEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "@/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext({});

export function GameContextProvider({ children }) {
  const [player, setPlayer] = useState(() => getLocalStorageItem("player"));
  const [spectator, setSpectatorData] = useState(() =>
    getLocalStorageItem("spectator"),
  );

  function setSpectator(value) {
    setSpectatorData((prev) => ({
      ...prev,
      [value?.game_id]: value,
    }));
  }

  function logout() {
    setPlayer(null);
    setSpectator(null);

    localStorage.removeItem("player");
    localStorage.removeItem("spectator");
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
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

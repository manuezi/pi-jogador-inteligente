import { createContext, useContext, useEffect, useState } from 'react';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils';

export const gameContext = createContext({});

export function GameContextProvider({ children }) {
  const [player, setPlayer] = useState(() => getLocalStorageItem('player'));
  const [spectator, setSpectatorData] = useState(() => getLocalStorageItem('spectator'));

  function setSpectator(value) {
    setSpectatorData((prev) => ({
      ...prev,
      [value?.game_id]: value,
    }));
  }

  function logout() {
    setPlayer(null);
    setSpectator(null);

    localStorage.removeItem('player');
    localStorage.removeItem('spectator');
  }

  useEffect(() => {
    if (player) {
      setLocalStorageItem('player', player);
      setAccessToken(player?.player_access_token);
    } else {
      localStorage.removeItem('player');
      setAccessToken(null);
    }
  }, [player]);

  useEffect(() => {
    if (spectator) setLocalStorageItem('spectator', spectator);
    else localStorage.removeItem('spectator');
  }, [spectator]);

  return (
    <gameContext.Provider
      value={{
        player,
        setPlayer,
        spectator,
        setSpectator,
        logout
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

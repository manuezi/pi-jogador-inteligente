import { createContext, useEffect, useState } from 'react';
import { setAccessToken } from '@/components/specific/helpers/fetch'; 


function readStoredValue(key) {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}


// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext({});

export const GameContextProvider = ({ children }) => {
  const [player, setPlayer] = useState(() => readStoredValue('player'));
  const [spectator, setSpectatorData] = useState(() =>
    readStoredValue('spectator')
  );

 function setSpectator(value) {
    setSpectatorData(() => {
      return Object.assign({}, spectator, {
        [value?.game_id]: value,
      });
    });
  }

  function logout() {
    setPlayer(null);
    setSpectator(null);
  }


  useEffect(() => {
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
      setAccessToken(player?.player_access_token);
    } else {
      localStorage.removeItem('player');
      setAccessToken(null);
    }
  }, [player]);

  useEffect(() => {
    if (spectator) {
      localStorage.setItem('spectator', JSON.stringify(spectator));
    } else {
      localStorage.removeItem('spectator');
    }
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


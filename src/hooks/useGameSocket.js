import { useEffect, useRef, useState } from "react";

import { api } from "@/services";

export function useGameSocket(gameId, token) {
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState(null);

  const reconnectTimeoutRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    if (!gameId || !token) return;

    function connect() {
      wsRef.current = api.connectGame({
        token,
        onOpen: () => {
          if (!isMounted) return;
          setConnected(true);
        },
        onMessage: (e) => {
          if (!isMounted) return;
          try {
            const gameState = JSON.parse(e.data);
            setGameState(gameState);
          } catch (err) {
            console.error(
              `[ERR]: Invalid message received from WebSocket: ${e.data}`,
              err,
            );
          }
        },
        onClose: () => {
          if (!isMounted) return;
          setConnected(false);
          // Reconecta automaticamente após 2 segundos se a partida ainda estiver ativa
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) connect();
          }, 2000);
        },
      });
    }
    connect();

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimeoutRef.current);
      wsRef.current?.close();
    };
  }, [gameId, token]);

  return {
    connected,
    gameState,
  };
}

import { useEffect, useRef, useState } from "react";

import { api } from "@/services";

export function useGameSocket(gameId, token) {
	const [connected, setConnected] = useState(false);
	const [currentGameState, setCurrentGameState] = useState(null);
	const [mounted, setMounted] = useState(false);

	const reconnectTimeout = useRef(null);
	const webSocketRef = useRef(null);

  function onMessage(event) {
    try {
      const dto = JSON.parse(event.data);
      setCurrentGameState(dto);
    } catch (err) {
      console.error(
        `[ERR]: Invalid message received from WebSocket: ${event.data}`,
        err
      );
    }
  }

	function onClose() {
		setConnected(false);
		// Reconecta automaticamente após 2 segundos se a partida ainda estiver ativa
		reconnectTimeout.current = setTimeout(() => {
			if (gameId) {
        webSocketRef.current = api.connectGame({
          token,
          onOpen,
          onMessage,
          onClose,
        });
			}
		}, 2000);
	}

	useEffect(() => {
		if (!gameId || !token || !mounted) return;

		webSocketRef.current = api.connectGame({
			token,
			onOpen: () => setConnected(true),
			onMessage,
			onClose,
		});

		return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      webSocketRef.current?.close();
    };
  }, [gameId, token, mounted]);

	useEffect(() => {
		setMounted(true);
	}, [mounted]);

	return {
		connected,
		gameState: currentGameState,
	};
}

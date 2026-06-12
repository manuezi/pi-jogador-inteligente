import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useJoinGame() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const joinGame = useCallback(
    async (gameId, payload) => {
      return execute(() => api.joinGame(gameId, payload));
    },
    [execute]
  );

  return { joinGame, ...rest };
}

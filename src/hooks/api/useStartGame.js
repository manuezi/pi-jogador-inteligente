import { useCallback } from "react";
import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useStartGame() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const startGame = useCallback(
    async (gameId, reason) => {
      return execute(() => api.startGame(gameId, reason));
    },
    [execute],
  );

  return { startGame, ...rest };
}

import { useCallback } from "react";
import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useCreateGame() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const createGame = useCallback(
    async (payload) => {
      return execute(() => api.createGame(payload));
    },
    [execute]
  );

  return { createGame, ...rest };
}

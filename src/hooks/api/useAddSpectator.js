import { useCallback } from "react";
import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useAddSpectator() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const addSpectator = useCallback(
    async (gameId, payload) => {
      return execute(() => api.addSpectator(gameId, payload));
    },
    [execute]
  );

  return { addSpectator, ...rest };
}

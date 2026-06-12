import { useCallback } from "react";
import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useCreatePlayer() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const createPlayer = useCallback(
    async (payload) => {
      return execute(() => api.createPlayer(payload));
    },
    [execute]
  );

  return { createPlayer, ...rest };
}

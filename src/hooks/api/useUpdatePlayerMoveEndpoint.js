import { useCallback } from "react";
import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useUpdatePlayerMoveEndpoint() {
  const { execute, ...rest } = useFetch(null, { manual: true });

  const updatePlayerMoveEndpoint = useCallback(
    async (playerId, endpoint) => {
      return execute(() => api.updatePlayerMoveEndpoint(playerId, endpoint));
    },
    [execute]
  );

  return { updatePlayerMoveEndpoint, ...rest };
}

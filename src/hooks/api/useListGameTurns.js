import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useListGameTurns(gameId) {
  const fetchFn = useCallback(() => api.listGameTurns(gameId), [gameId]);
  return useFetch(fetchFn);
}

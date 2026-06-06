import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useListGameMoves(gameId) {
  const fetchFn = useCallback(() => api.listGameMoves(gameId), [gameId]);
  return useFetch(fetchFn);
}

import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useGetGame(gameId) {
  const fetchFn = useCallback(() => api.getGame(gameId), [gameId]);
  return useFetch(fetchFn);
}

import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useListGames(params) {
  const fetchFn = useCallback(() => api.listGames(params), [params]);
  return useFetch(fetchFn);
}

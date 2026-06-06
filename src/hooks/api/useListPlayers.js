import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useListPlayers() {
  const fetchFn = useCallback(() => api.listPlayers(), []);
  return useFetch(fetchFn);
}

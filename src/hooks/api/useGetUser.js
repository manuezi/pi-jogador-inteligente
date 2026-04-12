import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useGetUser(username) {
  const fetchFn = useCallback(() => api.getUser(username), [username]);
  return useFetch(fetchFn);
}

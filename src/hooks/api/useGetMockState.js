import { useCallback } from "react";

import { api } from "@/services";
import { useFetch } from "./useFetch";

export function useGetMockState() {
  const fetchFn = useCallback(() => api.getMockState(), []);
  return useFetch(fetchFn);
}

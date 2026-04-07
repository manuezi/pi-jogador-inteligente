import { useState, useEffect } from "react";

/**
 * Motor genérico de requisições. A letra "T" representa o tipo do dado que virá da API.
 * @template T
 * @param {() => Promise<T>} fetchCallback Função que faz a chamada
 * @returns { { data: null, isLoading: true, error: null } | { data: T, isLoading: false, error: null } | { data: null, isLoading: false, error: Error } }
 */
export function useFetch(fetchCallback) {
  const [query, setQuery] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function run() {
      setQuery({ data: null, isLoading: true, error: null });

      try {
        const result = await fetchCallback();
        if (isMounted)
          setQuery({ data: result, isLoading: false, error: null });
      } catch (err) {
        if (isMounted) setQuery({ data: null, isLoading: false, error: err });
      }
    }
    run();

    return () => {
      isMounted = false;
    };
  }, [fetchCallback]);

  return query;
}

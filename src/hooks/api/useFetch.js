import { useState, useEffect } from "react";

/**
 * Motor genérico de requisições.
 * @template T
 * @param {() => Promise<T>} [fetchCallback] Função que faz a chamada
 * @param {Object} [options] Opções extras
 * @param {boolean} [options.manual] Se verdadeiro, a requisição não inicia automaticamente
 * @returns {{ data: T | null, isLoading: boolean, error: any, execute: (override?: () => Promise<T>) => Promise<T> }}
 */
export function useFetch(fetchCallback, options = { manual: false }) {
  const [query, setQuery] = useState({
    data: null,
    isLoading: !options.manual && !!fetchCallback,
    error: null,
  });

  const execute = async (callbackOverride) => {
    setQuery((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await (callbackOverride ? callbackOverride() : fetchCallback());
      setQuery({ data: result, isLoading: false, error: null });
      return result;
    } catch (err) {
      setQuery({ data: null, isLoading: false, error: err });
      throw err;
    }
  };

  useEffect(() => {
    if (options.manual || !fetchCallback) return;

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
  }, [fetchCallback, options.manual]);

  return { ...query, execute };
}

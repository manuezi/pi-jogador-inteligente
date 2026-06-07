import { useGetMockState } from "@/hooks/api";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import styles from "./Game.module.css";

export function Game() {
  const { data, isLoading, error } = useGetMockState();
  const { id } = useParams();


  async function fetchGame() {
    error(false);
    isLoading(true);
    try {
      const response = await fetch(
        "https://pi5-api-production.up.railway.app/api/v1/games/mock-state",
        {
          method: "POST",
        }
      );

      const game = await response.json();
      data(game);
    } catch (err) {
      error(true);
    } finally {
      isLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    fetchGame();
  }, [id]);

  if (isLoading || !data) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error.message}</div>;
  }



  return (
    <div className={styles.container}>
      <h1>IA Page</h1>
      <h1>Assistindo Jogo #{id}</h1>
      <Link to="/watch">&lt; Voltar</Link>
      <p>
      {error && <span>Erro: {error.message}</span>}
      {isLoading && <span>Carregando...</span>}
      {data && (
        <span>
          Estado do jogo: <pre>{JSON.stringify(data, null, 2)}</pre>
        </span>
      )}
      </p>
    </div>
  );
}

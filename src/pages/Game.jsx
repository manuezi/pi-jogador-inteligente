import { useGetMockState } from "@/hooks/api";
import styles from "./Game.module.css";

export function Game() {
  const { data, isLoading, error } = useGetMockState();

  if (isLoading || !data) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>IA Page</h1>

      <ul></ul>
    </div>
  );
}

import { Link, useParams } from "react-router";

import { useGetUser } from "@/hooks/api";
import styles from "./User.module.css";

export function User() {
  const { username } = useParams();
  const { data, isLoading, error } = useGetUser(username);

  if (error) return <div className={styles.container}>{error.message}</div>;
  if (isLoading) return <div className={styles.container}>Carregando...</div>;

  return (
    <div className={styles.container}>
      {isLoading ? "Carregando..." : data.name}
      <Link to="/">Voltar</Link>
    </div>
  );
}

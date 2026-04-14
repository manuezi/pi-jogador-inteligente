import styles from "./IAPage.module.css";
import { useGetUser } from "@/hooks/api"; //ARRUMAR

export function IAPage() {
  const { data, isLoading, error } = useGetUser(); //ARRUMAR

  if (isLoading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>IA Page</h1>

      <ul> // percorre os dados da API 
        {data.map((item) => ( 
          <li key={item.id}> 
            {item.nome} - {item.pontos}
          </li>
        ))}
      </ul>
    </div>
  );
}
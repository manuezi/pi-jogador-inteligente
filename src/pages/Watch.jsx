import { Link } from "react-router-dom";
import { cn } from "@/components/specific/helpers";
import { Typography } from '@/pages/text/Typography';
import { useEffect, useState } from "react";
import { listGames } from "@/components/specific/feature/api";

export function WatchListPage() {
  
  const [partidas, setPartidas] = useState([]);
console.log("PRIMEIRA PARTIDA", partidas[0]);

    useEffect(() => { async function buscarPartidas() {
    try {
      const response = await listGames();

      console.log(response);

      setPartidas(response.items);
    } catch (error) {
      console.error(error);
    }
  }


    buscarPartidas();
  }, []);

  return (
  <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>
    <Link to="/watch">&lt; Voltar</Link>

    <Typography
      variant="h1"
      asTag="h1"
      className={cn('text-4xl', 'font-bold')}
    >
      Partidas
    </Typography>

    <div>
      <h3>Total de partidas: {partidas.length}</h3>

      {partidas.map((partida) => (
        <div
          key={partida.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <p>
            <strong>ID:</strong> {partida.id}
          </p>

          <p>
            <strong>Status:</strong> {partida.status}
          </p>

          <p>
            <strong>Turno:</strong> {partida.current_turn_number}
          </p>

          <p>
            <strong>Lovelace:</strong>{" "}
            {partida.lovelace_player?.ai_player_name}
          </p>

          <p>
            <strong>Turing:</strong>{" "}
            {partida.turing_player?.ai_player_name}
          </p>

          <Link to={`/watch/${partida.id}`}>
            Assistir partida
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}
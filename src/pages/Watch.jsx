import { Link } from "react-router-dom";
import { cn } from "@/components/specific/helpers";
import { Typography } from '@/pages/text/Typography';
import { useEffect, useState } from "react";
import { listGames } from "@/components/specific/feature/api";

export function WatchListPage() {
  
  const [partidas, setPartidas] = useState({});
  
  async function buscarPartidas() {
    try{
      const response = await listGames();
      setPartidas(response);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    }
  }

  //useEffect(() => {
 //   buscarPartidas();
 // }, []);

  return (
    <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>
      <Link to="/watch">&lt; Voltar</Link>
      <Typography variant={'h1'} asTag={'h1'} className={cn('text-4xl', 'font-bold')}>
        Partidas 
      </Typography>
      <pre>{JSON.stringify(partidas, null, 2)}</pre>
    </div>

  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/pages/App.layout";
import { Home } from "@/pages/Home";
import { Game } from "@/pages/Game";
import { PlayerPage } from "@/pages/Player";
import { WatchListPage } from "@/pages/Watch";
import { GameContextProvider } from "@/contexts/GameContext";
import { GameFinished } from "@/pages/GameFinished";

export function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
        <Routes >
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/watch/:gameId" element={<Game />} />           
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/watch" element={<WatchListPage />} />
            <Route path="/results/:gameId" element={<GameFinished />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameContextProvider>
  );
}

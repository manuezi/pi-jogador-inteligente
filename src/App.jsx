import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/pages/App.layout";
import { Home } from "@/pages/Home";
import { Game } from "@/pages/Game";
import { PlayerPage } from "@/pages/Player";
import { WatchListPage } from "@/pages/Watch";
import { GameContextProvider } from "@/contexts/GameContext";

export function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
        <Routes >
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Game />} />           
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/watch" element={<WatchListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameContextProvider>
  );
}

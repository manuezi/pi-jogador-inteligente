import { BrowserRouter, Routes, Route } from "react-router";

import { AppLayout } from "./AppLayout";
import { Game, GameDetails, WatchListPage, PlayerPage } from "./pages";
import { GameContextProvider } from "@/contexts";

export function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<WatchListPage />} />
            <Route path="/watch/:gameId" element={<Game />} />
            <Route path="/results/:gameId" element={<GameDetails />} />
            <Route path="/player" element={<PlayerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameContextProvider>
  );
}

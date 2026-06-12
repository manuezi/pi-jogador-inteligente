import { BrowserRouter, Routes, Route } from "react-router";

import { AppLayout } from "./AppLayout";
import {
  Game,
  GameDetails,
  WatchListPage,
  PlayerPage,
  CreateMatch,
} from "./pages";
import { GameContextProvider } from "@/contexts";

export function App() {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<WatchListPage />} />
            <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/watch/:gameId" element={<Game />} />
            <Route path="/results/:gameId" element={<GameDetails />} />
            <Route path="/player" element={<PlayerPage />} />
          </Route>
        </Routes>
      </GameContextProvider>
    </BrowserRouter>
  );
}

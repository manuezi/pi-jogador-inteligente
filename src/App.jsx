import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./pages/App.layout";
import { Home, Game, WatchListPage } from "@/pages";
import { GameContextProvider } from "@/contexts/GameContext";

export function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
       <AppLayout>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Game />} />
          <Route path="/watch" element={<WatchListPage />} />
        </Routes>
        </AppLayout>
      </BrowserRouter>
    </GameContextProvider>
  );
}

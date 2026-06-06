import { BrowserRouter, Routes, Route } from "react-router";

import { Home, Game } from "@/pages";

export function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
        <header>Header</header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
        <footer>Footer</footer>
      </BrowserRouter>
    </GameContextProvider>
  );
}

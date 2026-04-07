import { BrowserRouter, Routes, Route } from "react-router";

import { Home, User } from "@/pages";

export function App() {
  return (
    <BrowserRouter>
      <header>Header</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:username" element={<User />} />
      </Routes>
      <footer>Footer</footer>
    </BrowserRouter>
  );
}

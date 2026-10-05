import { Route, Routes } from "react-router";

import { Home } from "@pages/Home";
import { Console } from "@pages/Console";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/console" element={<Console />} />
    </Routes>
  );
};

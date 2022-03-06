import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./view/Home";
import { QuickMatch } from "./view/QuickMatch";

export enum ROUTES {
  HOME = "/",
  QUICK_MATCH = "/quick-match",
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.QUICK_MATCH} element={<QuickMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

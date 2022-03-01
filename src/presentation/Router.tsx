import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./view/Home";
import { Missions } from "./view/Missions";

export enum ROUTES {
  HOME = "/",
  MISSIONS = "/missions",
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MISSIONS} element={<Missions />} />
      </Routes>
    </BrowserRouter>
  );
};

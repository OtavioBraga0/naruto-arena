import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./view/Home";

export enum ROUTES {
  HOME = "/",
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

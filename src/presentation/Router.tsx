import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Selection } from "./view/Selection";
import { Login } from "./view/Login";
import { QuickMatch } from "./view/QuickMatch";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

export enum ROUTES {
  SELECTION = "/selection",
  QUICK_MATCH = "/quick-match",
  LOGIN = "/",
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path={ROUTES.SELECTION}
          element={<PrivateRoute element={() => <Selection />} />}
        />
        <Route
          path={ROUTES.QUICK_MATCH}
          element={<PrivateRoute element={() => <QuickMatch />} />}
        />
        <Route
          path={ROUTES.LOGIN}
          element={<PublicRoute element={() => <Login />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

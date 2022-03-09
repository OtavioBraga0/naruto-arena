import React from "react";
import { RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { authSelector } from "../../domain/ducks/authReducer";
import { Login } from "../view/Login";

interface PrivateRouteProps extends Omit<RouteProps, "element"> {
  element: React.ElementType;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
}) => {
  const { user } = useSelector(authSelector);

  return user ? <Component /> : <Login />;
};

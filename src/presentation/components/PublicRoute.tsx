import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router";
import { authSelector } from "../../domain/ducks/authReducer";

import { Selection } from "../view/Selection";

interface PublicRouteProps extends Omit<RouteProps, "element"> {
  element: React.ElementType;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  element: Component,
}) => {
  const { user } = useSelector(authSelector);

  return user ? <Selection /> : <Component />;
};

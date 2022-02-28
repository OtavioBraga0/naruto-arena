import React from "react";
import { Persistor } from "redux-persist/es/types";
import { EngageStore } from "../domain/DomainLayer";

import { Main } from "./Main";

export function initializePresentationLayer(
  store: EngageStore,
  persistor: Persistor
): React.FC {
  const App: React.FC = () => <Main store={store} persistor={persistor} />;
  return App;
}

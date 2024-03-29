import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { initializeDataLayer } from "./data/DataLayer";
import { initializeDomainLayer } from "./domain/DomainLayer";
import { initializePresentationLayer } from "./presentation/PresentationLayer";

const { store, persistor } = initializeDomainLayer();
initializeDataLayer();
const App = initializePresentationLayer(store, persistor);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

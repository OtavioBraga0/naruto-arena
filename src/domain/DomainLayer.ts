import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { ReducersMapObject } from "redux";
import { Persistor } from "redux-persist/es/types";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CharActionType, charReducer, CharState } from "./ducks/charReducer";

export interface EngageState {
  readonly char: CharState;
}

export type EngageActions = CharActionType;

export type EngageStore = EnhancedStore<EngageState, EngageActions>;
const rootReducer: ReducersMapObject<EngageState, EngageActions> = {
  char: charReducer,
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const initializeDomainLayer = (
  preloadedState?: EngageState
): { store: EngageStore; persistor: Persistor } => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    preloadedState,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

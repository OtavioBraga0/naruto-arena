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
import {
  CharacterActionType,
  characterReducer,
  CharacterState,
} from "./ducks/characterReducer";

export interface EngageState {
  readonly character: CharacterState;
}

export type EngageActions = CharacterActionType;

export type EngageStore = EnhancedStore<EngageState, EngageActions>;
const rootReducer: ReducersMapObject<EngageState, EngageActions> = {
  character: characterReducer,
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

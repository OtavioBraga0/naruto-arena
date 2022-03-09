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
import { TeamActionType, teamReducer, TeamState } from "./ducks/teamReducer";
import {
  BattleActionType,
  battleReducer,
  BattleState,
} from "./ducks/battleReducer";
import { authReducer, AuthState } from "./ducks/authReducer";

export interface EngageState {
  readonly character: CharacterState;
  readonly team: TeamState;
  readonly battle: BattleState;
  readonly auth: AuthState;
}

export type EngageActions = CharacterActionType &
  TeamActionType &
  BattleActionType;

export type EngageStore = EnhancedStore<EngageState, EngageActions>;
const rootReducer: ReducersMapObject<EngageState, EngageActions> = {
  character: characterReducer,
  team: teamReducer,
  battle: battleReducer,
  auth: authReducer,
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["team", "auth"],
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

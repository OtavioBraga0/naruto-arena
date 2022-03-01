import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";
import { ICharacter } from "../entities/Character";

export type TeamActionType = PayloadAction<boolean> | PayloadAction<void>;
export interface TeamState {
  team: Array<ICharacter>;
  isLoading: boolean;
  error: { error: boolean; errorCode: string };
}

export const TEAM_INITIAL_STATE: TeamState = {
  team: [],
  isLoading: false,
  error: { error: false, errorCode: `` },
};

export const teamSelector = (state: EngageState): TeamState => state.team;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/team/setLoading"
);

export const addOnTeam: PayloadActionCreator<ICharacter> = createAction(
  "duck/team/addOnTeam"
);

export const removeFromTeam: PayloadActionCreator<Array<ICharacter>> =
  createAction("duck/team/removeFromTeam");

function handleSetLoading(state: TeamState, action: boolean): TeamState {
  return {
    ...state,
    isLoading: action,
  };
}

function handleAddOnTeam(
  state: TeamState,
  action: PayloadAction<ICharacter>
): TeamState {
  return {
    ...state,
    team: [...state.team, action.payload],
  };
}

function handelRemoveFromTeam(
  state: TeamState,
  action: PayloadAction<Array<ICharacter>>
): TeamState {
  return {
    ...state,
    team: action.payload,
  };
}

export const teamReducer: Reducer<TeamState, TeamActionType> = createReducer(
  TEAM_INITIAL_STATE,
  {
    [setLoading.type]: handleSetLoading,
    [addOnTeam.type]: handleAddOnTeam,
    [removeFromTeam.type]: handelRemoveFromTeam,
  }
);

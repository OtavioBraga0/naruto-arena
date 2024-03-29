import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";
import { ICharacter } from "../entities/Character";
import {
  getPaginatedCharacterThunk,
  getDetailedCharacterThunk,
} from "../thunks/characterThunk";

export type CharacterActionType = PayloadAction<boolean> | PayloadAction<void>;
export interface CharacterState {
  paginatedCharacters: Array<ICharacter>;
  detailedCharacter?: ICharacter;
  team: Array<ICharacter>;
  isLoading: boolean;
  error: { error: boolean; errorCode: string };
}

export const CHARACTER_INITIAL_STATE: CharacterState = {
  paginatedCharacters: [],
  team: [],
  isLoading: false,
  error: { error: false, errorCode: `` },
};

export const characterSelector = (state: EngageState): CharacterState =>
  state.character;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/character/setLoading"
);

function handleSetLoading(
  state: CharacterState,
  action: boolean
): CharacterState {
  return {
    ...state,
    isLoading: action,
  };
}

function handleGetPaginatedCharacters(
  state: CharacterState,
  action: PayloadAction<Array<ICharacter>>
): CharacterState {
  return {
    ...state,
    paginatedCharacters: action.payload,
  };
}

function handleGetDetailedCharacters(
  state: CharacterState,
  action: PayloadAction<ICharacter>
): CharacterState {
  return {
    ...state,
    detailedCharacter: action.payload,
  };
}

function handlePending(state: CharacterState): CharacterState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejected(state: CharacterState): CharacterState {
  return {
    ...state,
    isLoading: false,
    error: { error: true, errorCode: `Rejected` },
  };
}

export const characterReducer: Reducer<CharacterState, CharacterActionType> =
  createReducer(CHARACTER_INITIAL_STATE, {
    [setLoading.type]: handleSetLoading,
    [getPaginatedCharacterThunk.pending.type]: handlePending,
    [getPaginatedCharacterThunk.rejected.type]: handleRejected,
    [getPaginatedCharacterThunk.fulfilled.type]: handleGetPaginatedCharacters,
    [getDetailedCharacterThunk.pending.type]: handlePending,
    [getDetailedCharacterThunk.rejected.type]: handleRejected,
    [getDetailedCharacterThunk.fulfilled.type]: handleGetDetailedCharacters,
  });

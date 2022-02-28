import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";
import { ICharacter } from "../entities/Character";
import { getAllCharacterThunk } from "../thunks/characterThunk";

export type CharacterActionType = PayloadAction<boolean> | PayloadAction<void>;

export interface CharacterState {
  allCharacters: Array<ICharacter>;
  isLoading: boolean;
  error: { error: boolean; errorCode: string };
}

export const CHARACTER_INITIAL_STATE: CharacterState = {
  allCharacters: [],
  isLoading: false,
  error: { error: false, errorCode: `` },
};

export const characterSelector = (state: EngageState): CharacterState =>
  state.character;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/user/setLoading"
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

function handleGetAllCharacters(
  state: CharacterState,
  action: PayloadAction<Array<ICharacter>>
): CharacterState {
  return {
    ...state,
    allCharacters: action.payload,
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
    [getAllCharacterThunk.pending.type]: handlePending,
    [getAllCharacterThunk.rejected.type]: handleRejected,
    [getAllCharacterThunk.fulfilled.type]: handleGetAllCharacters,
  });

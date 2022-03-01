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
  getAllCharacterThunk,
  getDetailedCharacterThunk,
} from "../thunks/characterThunk";

export type CharacterActionType = PayloadAction<boolean> | PayloadAction<void>;

export type ListType = {
  characters: Array<ICharacter>;
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
};
export interface CharacterState {
  allCharacters: ListType;
  detailedCharacter?: ICharacter;
  team: Array<ICharacter>;
  isLoading: boolean;
  error: { error: boolean; errorCode: string };
}

export const CHARACTER_INITIAL_STATE: CharacterState = {
  allCharacters: { characters: [] },
  team: [],
  isLoading: false,
  error: { error: false, errorCode: `` },
};

export const characterSelector = (state: EngageState): CharacterState =>
  state.character;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/character/setLoading"
);

export const addOnTeam: PayloadActionCreator<ICharacter> = createAction(
  "duck/character/addOnTeam"
);

export const removeFromTeam: PayloadActionCreator<Array<ICharacter>> =
  createAction("duck/character/removeFromTeam");

function handleSetLoading(
  state: CharacterState,
  action: boolean
): CharacterState {
  return {
    ...state,
    isLoading: action,
  };
}

function handleAddOnTeam(
  state: CharacterState,
  action: PayloadAction<ICharacter>
): CharacterState {
  return {
    ...state,
    team: [...state.team, action.payload],
  };
}

function handelRemoveFromTeam(
  state: CharacterState,
  action: PayloadAction<Array<ICharacter>>
): CharacterState {
  return {
    ...state,
    team: action.payload,
  };
}

function handleGetAllCharacters(
  state: CharacterState,
  action: PayloadAction<ListType>
): CharacterState {
  return {
    ...state,
    allCharacters: action.payload,
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
    [getAllCharacterThunk.pending.type]: handlePending,
    [getAllCharacterThunk.rejected.type]: handleRejected,
    [getAllCharacterThunk.fulfilled.type]: handleGetAllCharacters,
    [getDetailedCharacterThunk.pending.type]: handlePending,
    [getDetailedCharacterThunk.rejected.type]: handleRejected,
    [getDetailedCharacterThunk.fulfilled.type]: handleGetDetailedCharacters,
    [addOnTeam.type]: handleAddOnTeam,
    [removeFromTeam.type]: handelRemoveFromTeam,
  });

import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";

export type CharActionType = PayloadAction<boolean> | PayloadAction<void>;

export interface CharState {
  isLoading: boolean;
  error: { error: boolean; errorCode: string };
}

export const CHAR_INITIAL_STATE: CharState = {
  isLoading: false,
  error: { error: false, errorCode: `` },
};

export const charSelector = (state: EngageState): CharState => state.char;

export const setLoading: PayloadActionCreator<boolean> = createAction(
  "duck/user/setLoading"
);

function handleSetLoading(state: CharState, action: boolean): CharState {
  return {
    ...state,
    isLoading: action,
  };
}

function handlePending(state: CharState): CharState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejected(state: CharState): CharState {
  return {
    ...state,
    isLoading: false,
    error: { error: true, errorCode: `Rejected` },
  };
}

export const charReducer: Reducer<CharState, CharActionType> = createReducer(
  CHAR_INITIAL_STATE,
  {
    [setLoading.type]: handleSetLoading,
  }
);

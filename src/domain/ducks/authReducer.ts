import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { IUser } from "../entities/User";
import { signInThunk } from "../thunks/authThunk";

export type AuthActionType =
  | PayloadAction<boolean>
  | PayloadAction<void>
  | PayloadAction<IUser>;

export interface AuthState {
  user?: IUser;
  isLoading: boolean;
}

export const AUTH_INITIAL_STATE: AuthState = {
  isLoading: false,
};

export const authSelector = (state: EngageState): AuthState => state.auth;

function handleAuthUser(state: AuthState, action: PayloadAction<IUser>) {
  console.log(action.payload);

  return {
    ...state,
    user: action.payload,
  };
}

function handlePending(state: AuthState) {
  return {
    ...state,
    isLoading: true,
  };
}
function handleRejected(state: AuthState) {
  return {
    ...state,
    isLoading: false,
  };
}

export const authReducer: Reducer<AuthState, AuthActionType> = createReducer(
  AUTH_INITIAL_STATE,
  {
    [signInThunk.fulfilled.type]: handleAuthUser,
    [signInThunk.pending.type]: handlePending,
    [signInThunk.rejected.type]: handleRejected,
  }
);

import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import {
  signInWithCredentials,
  signUpWithCredentials,
} from "../../data/firebase/auth";
import { IUser } from "../entities/User";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}

export const signInThunk = createAsyncThunk<
  IUser,
  { email: string; password: string },
  ThunkApi
>("thunk/auth/signInThunk", async (payload, thunkAPI) => {
  try {
    console.log("here");

    const user = await signInWithCredentials(payload.email, payload.password);
    console.log(user);

    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signUpThunk = createAsyncThunk<
  IUser,
  { email: string; password: string },
  ThunkApi
>("thunk/auth/signUpThunk", async (payload, thunkAPI) => {
  try {
    return await signUpWithCredentials(payload.email, payload.password);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

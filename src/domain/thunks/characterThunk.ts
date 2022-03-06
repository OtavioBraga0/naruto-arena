import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import {
  getPaginatedCharacter,
  getDetailedCharacter,
} from "../../data/services/character";
import { ICharacter } from "../entities/Character";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}
export const getPaginatedCharacterThunk = createAsyncThunk<
  Array<ICharacter>,
  void,
  ThunkApi
>("thunk/character/getPaginatedCharacterThunk", async (_, thunkAPI) => {
  try {
    const response = await getPaginatedCharacter();

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getDetailedCharacterThunk = createAsyncThunk<
  ICharacter,
  number,
  ThunkApi
>("thunk/character/getDetailedCharacterThunk", async (payload, thunkAPI) => {
  try {
    return await getDetailedCharacter(payload);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

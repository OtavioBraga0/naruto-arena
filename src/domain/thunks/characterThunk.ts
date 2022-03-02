import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import {
  getPaginatedCharacter,
  getDetailedCharacter,
} from "../../data/services/character";
import { ListType } from "../ducks/characterReducer";
import { ICharacter } from "../entities/Character";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}
export const getPaginatedCharacterThunk = createAsyncThunk<
  ListType,
  { page: number },
  ThunkApi
>("thunk/character/getPaginatedCharacterThunk", async (payload, thunkAPI) => {
  try {
    const response = await getPaginatedCharacter(payload.page);

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

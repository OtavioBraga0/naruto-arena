import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { getDetailedCharacter } from "../../data/services/character";
import { ICharacter } from "../entities/Character";
import { getAllCharacters } from "../../data/firebase/character";

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
    const response = await getAllCharacters();

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

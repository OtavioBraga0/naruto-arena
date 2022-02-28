import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { ICharacter } from "../entities/Character";
import { getAllCharacters } from "../../data/services/character";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}
export const getAllCharacterThunk = createAsyncThunk<
  ICharacter[],
  void,
  ThunkApi
>("thunk/character/getAllCharacterThunk", async (_, thunkAPI) => {
  try {
    const allCharacters = await getAllCharacters();

    console.log(allCharacters);

    return allCharacters;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

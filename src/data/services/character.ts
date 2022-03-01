import axios from "axios";
import { ListType } from "../../domain/ducks/characterReducer";
import { ICharacter } from "../../domain/entities/Character";
import { parseLinkHeader } from "../../utils/parser";

export async function getAllCharacters(
  page: number = 1,
  limit: number = 21
): Promise<ListType> {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/characters?_page=${page}&_limit=${limit}&_sort=id&_order=asc`
  );

  return {
    ...parseLinkHeader(response.headers.link),
    characters: response.data,
  };
}

export async function getDetailedCharacter(id: number): Promise<ICharacter> {
  return (await axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}`))
    .data;
}

import axios from "axios";
import { ICharacter } from "../../domain/entities/Character";

export async function getAllCharacters(): Promise<Array<ICharacter>> {
  return (await axios.get(`${process.env.REACT_APP_API_URL}/characters`)).data;
}

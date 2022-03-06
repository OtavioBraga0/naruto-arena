import axios from "axios";
import { ICharacter } from "../../domain/entities/Character";

export async function getPaginatedCharacter(): Promise<Array<ICharacter>> {
  return (await axios.get(`${process.env.REACT_APP_API_URL}/characters`)).data;
}

export async function getDetailedCharacter(id: number): Promise<ICharacter> {
  return (await axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}`))
    .data;
}

import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { firestore } from ".";
import { ICharacter } from "../../domain/entities/Character";

export async function getAllCharacters(): Promise<Array<ICharacter>> {
  const charactersCollection = query(
    collection(firestore, "characters"),
    orderBy("id", "asc")
  );
  const charactersSnapshot = await getDocs(charactersCollection);
  const characters = charactersSnapshot.docs.map((doc) => doc.data());

  return characters as Array<ICharacter>;
}

import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { firebaseApp } from ".";
import { ICharacter } from "../../domain/entities/Character";

export async function getAllCharacters(): Promise<Array<ICharacter>> {
  const charactersCollection = query(
    collection(firebaseApp, "characters"),
    orderBy("id", "asc")
  );
  const charactersSnapshot = await getDocs(charactersCollection);
  const characters = charactersSnapshot.docs.map((doc) => doc.data());

  return characters as Array<ICharacter>;
}

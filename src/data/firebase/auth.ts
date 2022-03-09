import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from ".";

export async function signInWithCredentials(email: string, password: string) {
  return (await signInWithEmailAndPassword(auth, email, password)).user;
}

export async function signUpWithCredentials(email: string, password: string) {
  return await (
    await createUserWithEmailAndPassword(auth, email, password)
  ).user;
}

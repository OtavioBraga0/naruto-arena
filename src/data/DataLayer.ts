import { initializaFirebase } from "./firebase";
import { initializeAxios } from "./services";

export function initializeDataLayer() {
  initializaFirebase();
  initializeAxios();
}

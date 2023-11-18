import {
  setCurrentTyped,
  setCurrentWord,
  resetWordHistory,
  setGameStatus,
  setCurrentTimer,
} from "@/store/app-slice";
import { store } from "@/store/store";
import { generateWords } from "../lib/generate-words";

export const reset = () => {
  const { dispatch, getState } = store;
  const {
    app: { currentTyped, currentWord, typedHistory, currentTimer },
  } = getState();

  generateWords();

  dispatch(setCurrentTyped(""));
  dispatch(setCurrentWord(0));
  dispatch(resetWordHistory([]));
  dispatch(setGameStatus("ready"));
  dispatch(setCurrentTimer(currentTimer));

  document
    .querySelectorAll(".text-red-500")
    .forEach((el) => el.classList.remove("text-red-500"));
  document
    .querySelectorAll(".text-yellow-300")
    .forEach((el) => el.classList.remove("text-yellow-300"));
};

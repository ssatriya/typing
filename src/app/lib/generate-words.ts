import randomWords from "random-words";

import { store } from "@/store/store";
import { setCurrentWordList } from "@/store/app-slice";

export const generateWords = () => {
  const { dispatch, getState } = store;

  const words = randomWords(60);
  dispatch(setCurrentWordList(words));
};

import { store } from "@/store/store";
import {
  setCurrentTyped,
  setGameStatus,
  setTypedHistory,
} from "@/store/app-slice";

export const registerKey = (key: string, wordRef: any) => {
  const { dispatch, getState } = store;
  //prettier-ignore
  const {app :{ currentTyped} } = getState()

  if (key === " ") {
    const currentWordElement = wordRef.current;
    const scroll = currentWordElement?.nextElementSibling;
    scroll?.scrollIntoView({ behavior: "smooth", block: "center" });

    dispatch(setTypedHistory());
  }

  if (key.length === 1) {
    if (key === " ") return;
    dispatch(setGameStatus("run"));
    dispatch(setCurrentTyped(currentTyped + key));
  }
};

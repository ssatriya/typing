import { setCurrentTyped } from "@/store/app-slice";
import { store } from "@/store/store";

export const deleteKey = () => {
  const { dispatch, getState } = store;
  //prettier-ignore
  const {app :{ currentTyped} } = getState()

  const newCurrentTyped = currentTyped.slice(0, -1);
  dispatch(setCurrentTyped(newCurrentTyped));
};

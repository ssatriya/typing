"use client";

import * as React from "react";

import Typing from "./components/typing";
import { registerKey } from "./helpers/addKey";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { deleteKey } from "./helpers/deleteKey";
import { generateWords } from "./lib/generate-words";
import { setGameStatus } from "@/store/app-slice";
import { reset } from "./helpers/reset";
import Timer from "./components/timer";

export default function Home() {
  const dispatch = useDispatch();
  const wordRef = React.useRef<HTMLDivElement>(null);
  //prettier-ignore
  const {currentTyped, currentWord, gameStatus, currentTimer} = useSelector((state: RootState) => state.app)
  const [localTimer, setLocalTimer] = React.useState<number>(currentTimer);

  React.useEffect(() => {
    generateWords();
    document.onkeydown = (e) => {
      const key = e.key;
      if (key.length === 1) {
        registerKey(key, wordRef);
      }
      if (key === "Backspace") {
        deleteKey();
      }
      if (key === "Shift") {
        reset();
      }
    };
  }, []);

  React.useEffect(() => {
    const idx = currentTyped.length - 1;
    const currWordEl = wordRef.current;

    if (currWordEl) {
      currWordEl.children[idx + 1].classList.add(
        currentWord[idx] !== currentTyped[idx]
          ? "text-red-500"
          : "text-yellow-300"
      );
    }
  }, [wordRef, currentTyped, currentWord]);

  React.useEffect(() => {
    const idx = currentTyped.length;
    const currWordEl = wordRef.current;

    if (currWordEl && idx < currentWord.length) {
      currWordEl.children[idx + 1].classList.remove(
        "text-red-500",
        "text-yellow-300"
      );
    }
  }, [wordRef, currentTyped, currentWord]);

  React.useEffect(() => {
    let timerId: any;
    if (gameStatus === "run" && localTimer > 0) {
      timerId = setInterval(() => {
        setLocalTimer((prev) => prev - 1);
      }, 1000);
    } else if (localTimer === 0) {
      dispatch(setGameStatus("finish"));
    }

    return () => clearInterval(timerId);
  }, [gameStatus, localTimer, dispatch]);

  return (
    <div className="h-[600px] flex flex-col justify-center items-center">
      <Timer timer={localTimer} />
      <Typing ref={wordRef} />
    </div>
  );
}

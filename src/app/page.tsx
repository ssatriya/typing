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
import { Loader2Icon, RefreshCw } from "lucide-react";
import HeaderOptions from "./components/header-options";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const wordRef = React.useRef<HTMLDivElement>(null);
  //prettier-ignore
  const {currentTyped, currentWord, gameStatus, currentTimer, currentWordList} = useSelector((state: RootState) => state.app)
  const [localTimer, setLocalTimer] = React.useState<number>(currentTimer);

  React.useEffect(() => {
    if (currentWordList.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentWordList]);

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeaderOptions />
      <Timer timer={localTimer} />
      {isLoading ? (
        <div className="h-[130px] mt-6 flex items-center justify-center">
          <Loader2Icon className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <Typing ref={wordRef} />
      )}
      <div className="mt-12">
        <button
          onClick={() => reset()}
          className="px-8 py-4 border-2 border-gray-500 rounded-xl"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-32">
        <p className="text-xs">
          <kbd className="py-[2px] px-1 bg-gray-600 rounded-sm">Shift</kbd> to
          reset
        </p>
      </div>
    </div>
  );
}

"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export default function Result() {
  const { currentWordList, typedHistory, currentTyped, currentWord } =
    useSelector((state: RootState) => state.app);

  const spaces = currentWordList.indexOf(currentWord);
  let correctChar = 0;
  let correctWord = 0;
  let IncorrectWord = 0;

  const result = typedHistory.map((typed, idx) => {
    const compare = typed === currentWordList[idx];

    if (compare) {
      correctWord++;
    } else {
      IncorrectWord++;
    }

    return compare;
  });

  result.forEach((r, i) => {
    if (r) {
      correctChar += currentWordList[i].length;
    }
  });

  let totalChar = 0;
  const totalWord = currentWordList.slice(0, spaces);

  totalWord.forEach((w, i) => {
    totalChar += w.length;
  });

  const wpm = (+spaces + +correctChar / 5) / 1;

  let accuracy = 0;

  if (totalChar !== 0) {
    accuracy = (+correctChar / +totalChar) * 100;
  }

  return (
    <div className={`mt-12 ${robotoMono.className}`}>
      <div>{wpm || 0} Word Per Minute</div>
      <div>Correct Words: </div>
      <div>Incorrect Words: </div>
      <div>Accuracy: {Number(accuracy).toFixed(2)} %</div>
    </div>
  );
}

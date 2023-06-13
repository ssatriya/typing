import * as React from "react";
import { Roboto_Mono } from "next/font/google";
import { useSelector } from "react-redux";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

import { RootState } from "@/store/store";

const Typing = React.forwardRef((props, ref) => {
  const { typedHistory, currentWordList, currentWord, currentTyped } =
    useSelector((state: RootState) => state.app);

  const extraLetters = currentTyped.slice(currentWord.length).split("");

  return (
    <div
      className={`flex justify-center text-[28px] items-center w-[800px] flex-wrap mt-6 h-[130px] overflow-hidden  ${robotoMono.className}`}
    >
      {currentWordList.map((word, wordIndex) => {
        //prettier-ignore
        const isActive = word === currentWord && typedHistory.length === wordIndex;
        return (
          <div
            key={wordIndex}
            // @ts-ignore
            ref={isActive ? ref : null}
            className="relative flex mr-[16.81px]"
          >
            {isActive ? (
              <span
                className="animate-pulse absolute ml-[-9px] font-normal text-white"
                style={{ left: currentTyped.length * 16.81 }}
              >
                |
              </span>
            ) : null}
            {word.split("").map((char, charIndex) => {
              return <span key={charIndex}>{char}</span>;
            })}
            {isActive
              ? extraLetters.map((letter, letterIndex) => {
                  return (
                    <span key={letterIndex} className="text-gray-500">
                      {letter}
                    </span>
                  );
                })
              : typedHistory[wordIndex]
              ? typedHistory[wordIndex]
                  .slice(currentWordList[wordIndex]?.length)
                  .split("")
                  .map((history, historyIndex) => {
                    return (
                      <span key={historyIndex} className="text-gray-500">
                        {history}
                      </span>
                    );
                  })
              : null}
          </div>
        );
      })}
    </div>
  );
});

Typing.displayName = "Typing";

export default Typing;

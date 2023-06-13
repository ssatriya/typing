import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentTyped: string;
  currentWordList: string[];
  currentWord: string;
  typedHistory: string[];
  currentTimer: 15 | 30 | 60;
  gameStatus: "ready" | "run" | "finish";
}

const initialState = {
  currentTyped: "",
  currentWordList: [],
  currentWord: "",
  typedHistory: [],
  currentTimer: 30,
  gameStatus: "ready",
} as AppState;

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setCurrentWordList(state, action: PayloadAction<string[]>) {
      const wordList = action.payload;
      state.currentWordList = action.payload;
      state.currentWord = wordList[0];
    },
    setCurrentWord(state, action: PayloadAction<number>) {
      state.currentWord = state.currentWordList[action.payload];
    },
    setCurrentTyped(state, action: PayloadAction<string>) {
      state.currentTyped = action.payload;
    },
    backspace(state) {
      state.currentTyped;
    },
    resetWordHistory(state, action: PayloadAction<string[]>) {
      state.typedHistory = [];
    },
    setTypedHistory(state) {
      const nextCurrentWordIndex = state.typedHistory.length + 1;

      state.typedHistory.push(state.currentTyped);
      state.currentWord = state.currentWordList[nextCurrentWordIndex];
      state.currentTyped = "";
    },
    setCurrentTimer(state, action: PayloadAction<15 | 30 | 60>) {
      state.currentTimer = action.payload;
    },
    setGameStatus(state, action: PayloadAction<"ready" | "run" | "finish">) {
      state.gameStatus = action.payload;
    },
  },
});

export const {
  setCurrentWordList,
  setCurrentWord,
  setCurrentTyped,
  setTypedHistory,
  resetWordHistory,
  setCurrentTimer,
  setGameStatus,
} = appSlice.actions;
export default appSlice.reducer;

"use client";

import { useDispatch, useSelector } from "react-redux";

import { setCurrentTimer } from "@/store/app-slice";
import { RootState } from "@/store/store";

export default function HeaderOptions() {
  const dispatch = useDispatch();
  const { currentTimer } = useSelector((state: RootState) => state.app);

  return (
    <div className="w-full mb-32 bg-gray-900 rounded-md">
      <div className="flex items-center">
        <p className="pl-2">Time</p>
        <button
          onClick={() => dispatch(setCurrentTimer(15))}
          className={`${
            currentTimer === 15 ? "text-white" : "text-gray-400"
          } p-2 transition-colors hover:text-white`}
        >
          15
        </button>
        <button
          onClick={() => dispatch(setCurrentTimer(30))}
          className={`${
            currentTimer === 30 ? "text-white" : "text-gray-400"
          } p-2 transition-colors hover:text-white`}
        >
          30
        </button>
        <button
          onClick={() => dispatch(setCurrentTimer(60))}
          className={`${
            currentTimer === 60 ? "text-white" : "text-gray-400"
          } p-2 transition-colors hover:text-white`}
        >
          60
        </button>
      </div>
    </div>
  );
}

"use client";

import { useDispatch, useSelector } from "react-redux";

import { setCurrentTimer } from "@/store/app-slice";

export default function HeaderOptions() {
  const dispatch = useDispatch();
  return (
    <div className="w-full mb-32 bg-gray-900 rounded-md">
      <div className="flex items-center">
        <p className="pl-2">Time</p>
        <button
          onClick={() => dispatch(setCurrentTimer(15))}
          className="p-2 text-gray-400 transition-colors hover:text-white"
        >
          15
        </button>
        <button
          onClick={() => dispatch(setCurrentTimer(30))}
          className="p-2 text-gray-400 transition-colors hover:text-white"
        >
          30
        </button>
        <button
          onClick={() => dispatch(setCurrentTimer(60))}
          className="p-2 text-gray-400 transition-colors hover:text-white"
        >
          60
        </button>
      </div>
    </div>
  );
}

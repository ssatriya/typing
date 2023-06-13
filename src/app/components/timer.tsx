import * as React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const Timer = ({ timer }: { timer: number }) => {
  return (
    <div className={`w-[800px] flex items-start ${inter.className}`}>
      <p className="text-xl font-semibold">{timer}</p>
    </div>
  );
};

export default Timer;

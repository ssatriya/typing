import * as React from "react";

const Timer = ({ timer }: { timer: number }) => {
  return (
    <div className="flex justify-end items-end">
      <p>{timer}</p>
    </div>
  );
};

export default Timer;

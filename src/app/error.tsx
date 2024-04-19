"use client";

import { useEffect } from "react";

type ErrorType = {
    error: any; 
    reset: () => void; 
  };

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <div>
      <h1>Oops!</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

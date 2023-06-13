"use client";

import * as React from "react";
import { Provider } from "react-redux";

import { store } from "@/store/store";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;

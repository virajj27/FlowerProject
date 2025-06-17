'use client'
import React from "react";
import { configureStore } from "@reduxjs/toolkit"
import formReducer from './formSlice'
import { Provider } from "react-redux"
export const store= configureStore({
    reducer:{form: formReducer},
})

export type RootState = ReturnType<typeof store.getState>;

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

 


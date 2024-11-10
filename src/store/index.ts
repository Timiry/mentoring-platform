import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { mainApi } from "./services/main";
import { authApi } from "./services/auth";
import authReducer from "./slices/auth";
import loginStepReduser from "./slices/login";


export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    step: loginStepReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(authApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

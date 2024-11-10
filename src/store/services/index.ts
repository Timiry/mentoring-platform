import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { RootState } from "..";
import { removeSession } from "../slices/auth";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === "development"
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL,
  prepareHeaders: (header, { getState }) => {
    const token = (getState() as RootState).auth.token;
    header.set("Accept", "application/json");
    if (token) {
      header.set("Authorization", `Bearer ${token}`);
    }
    return header;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      api.dispatch(removeSession());
      release();
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

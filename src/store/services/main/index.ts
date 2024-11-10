import { createApi } from "@reduxjs/toolkit/query";

import { baseQueryWithReauth } from "..";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [],
});

import { createApi } from "@reduxjs/toolkit/query";

import { baseQueryWithReauth } from "..";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [],
});

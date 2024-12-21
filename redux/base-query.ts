import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = Cookies.get("auth_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

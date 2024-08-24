"use server";

import { JWT_COOKIE_NAME, REFRESH_TOKEN_NAME } from "@/constants/Auth";
import { cookies } from "next/headers";

export async function getServerSideToken() {
  const cookie = cookies();
  const accessToken = cookie.get(JWT_COOKIE_NAME)?.value || null;
  const refreshToken = cookie.get(REFRESH_TOKEN_NAME)?.value || null;

  return Promise.resolve({ accessToken, refreshToken });
}

"use server";

import { JWT_COOKIE_NAME } from "@/constants/Auth";
import { cookies } from "next/headers";

export async function getServerSideToken() {
  const cookie = cookies();
  const token = cookie.get(JWT_COOKIE_NAME)?.value || null;

  return Promise.resolve(token);
}

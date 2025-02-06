"use server";

import { JWT_COOKIE_NAME } from "@/constants/Auth";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Role } from "@/types/user";

export interface CustomJwtPayload extends JwtPayload {
  userType: Role;
}

interface Props {
  userType: Role[];
}

export async function AuthModule({ userType }: Props): Promise<{ token: string }> {
  const token = cookies().get(JWT_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = jwtDecode<CustomJwtPayload>(token);
  if (!userType.includes(decoded.userType)) {
    redirect("/");
  }

  return { token };
}

export async function TempUserGuard() {
  const headersList = headers();
  const url = headersList.get("x-url") || "";
  const pathname = new URL(url).pathname;
  const token = cookies().get(JWT_COOKIE_NAME)?.value;

  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.userType === "TEMP" && pathname !== "/register") {
      redirect("/register");
    }
  }
}

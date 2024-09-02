"use client";

import { CommonAxios } from "@/utils/CommonAxios";
import { Button } from "@mantine/core";

export default function Home() {
  const body = {
    name: "stop-user",
    phoneNumber: "010-1234-1234",
    userType: "INACTIVE_PROFESSOR",
    email: "email@gmail.com",
    signUpSource: "ad",
    division: null,
    position: null,
  };

  return (
    <main>
      <Button
        onClick={() => {
          CommonAxios.post("/auth/register", body);
        }}
      />
    </main>
  );
}

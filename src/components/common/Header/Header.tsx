"use client";

import { CommonAxios } from "@/utils/CommonAxios";
import { useEffect, useState } from "react";
import { HandoutOverview } from "./elements/HandoutOverview";
import { HeaderSymbol } from "./elements/HeaderSymbol";
import { HeaderToolBar } from "./elements/HeaderToolBar";
import { HeaderTopNav } from "./elements/HeaderTopNav";
import styles from "./Header.module.css";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../Auth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth(); // Destructure logout here
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  useEffect(() => {
    if (isLoggedIn) {
      CommonAxios.get("/users/me")
        .then(() => {
          // 유저 정보가 정상적으로 확인되었다면 특별한 동작 없이 OK
        })
        .catch((error) => {
          // 예: code 4001이 응답되면 회원가입 페이지로 이동
          if (error.response?.data?.code === 4001) {
            router.push("/register");
          }
        });
    }
  }, [isLoggedIn, router, pathname]);
  // pathname을 의존성 배열에 추가 -> 경로가 바뀔 때마다 다시 실행

  return (
    <>
      <div className={styles.header} role="banner">
        <HeaderSymbol setIsOpen={setIsOpen} />
        <HeaderTopNav setIsOpen={setIsOpen} />
        <HeaderToolBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <>
        {/* handout 컨테이너 영역 클릭 시 창 닫기 */}
        <div
          className={`${styles.handout} ${isOpen ? styles.show : ""}`}
          onClick={() => setIsOpen(false)}
        >
          {/* content 영역 클릭 이벤트 차단 */}
          <div onClick={(e) => e.stopPropagation()}>
            <HandoutOverview setIsOpen={setIsOpen} />
          </div>
        </div>
        {/* handout 아래 overlay 영역 클릭 시 창 닫기 */}
        <div
          className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
          onClick={() => setIsOpen(false)}
        />
      </>
    </>
  );
}

"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import { IconLock } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.header} role="banner">
        <div className={styles.symbol}>
          <div className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Sungkyun Technology Open Party"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className={styles.dividerlnt} />
          <div className={styles.title}>
            <h1>S-TOP</h1>
            <span>성균관대학교 소프트웨어융합대학</span>
          </div>
        </div>
        <div className={styles.topnav} role="navigation">
          <ul>
            <li>
              <div>Projects</div>
              <ul>
                <li>전체보기</li>
                <li>AI/머신러닝</li>
                <li>인터랙션/증강현실</li>
                <li>컴퓨터 비전</li>
                <li>보안/SW공학</li>
                <li>시스템/네트워크</li>
                <li>자연어 처리</li>
                <li>빅데이터 분석</li>
                <li>웹/어플리케이션</li>
              </ul>
            </li>
            <li>
              <div>Interviews</div>
              <ul>
                <li>대담 영상</li>
                <li>퀴즈 챌린지</li>
              </ul>
            </li>
            <li>
              <div>Job Fair</div>
              <ul>
                <li>잡페어 인터뷰</li>
                <li>채용 공고</li>
              </ul>
            </li>
            <li>
              <div>AI Hub</div>
              <ul>
                <li>AI Model</li>
                <li>AI Dataset</li>
              </ul>
            </li>
            <li>
              <div>Events</div>
              <ul>
                <li>갤러리</li>
                <li>이벤트 공지사항</li>
              </ul>
            </li>
            <li>
              <div>Info Desk</div>
              <ul>
                <li>S-TOP 소개</li>
                <li>산학협력프로젝트 소개</li>
                <li>산학협력 과제 제안</li>
                <li>프로젝트 QnA</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.authorization}>
            <IconLock className={styles.lockico} />
            <div>Login</div>
            <div className={styles.dividerlnr} />
            <div>Sign up</div>
          </div>
          <div className={styles.swuniv}>
            <Image
              src="/images/swuniv_logo.png"
              alt="National Center of Excellence in Software"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div
            className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
            onClick={toggleHamburger}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className={`${styles.handout} ${isOpen ? styles.show : ""}`}>
        <div className={styles.overview}>
          <div>
            <b>Projects</b>
            <ul>
              <li>전체보기</li>
              <li>AI/머신러닝</li>
              <li>인터랙션/증강현실</li>
              <li>컴퓨터 비전</li>
              <li>보안/SW공학</li>
              <li>시스템/네트워크</li>
              <li>자연어 처리</li>
              <li>빅데이터 분석</li>
              <li>웹/어플리케이션</li>
            </ul>
          </div>
          <div>
            <b>Interviews</b>
            <ul>
              <li>대담 영상</li>
              <li>퀴즈 챌린지</li>
            </ul>
          </div>
          <div>
            <b>Job Fair</b>
            <ul>
              <li>잡페어 인터뷰</li>
              <li>채용 공고</li>
            </ul>
          </div>
          <div>
            <b>AI Hub</b>
            <ul>
              <li>AI Model</li>
              <li>AI Dataset</li>
            </ul>
          </div>
          <div>
            <b>Events</b>
            <ul>
              <li>갤러리</li>
              <li>이벤트 공지사항</li>
            </ul>
          </div>
          <div>
            <b>Info Desk</b>
            <ul>
              <li>S-TOP 소개</li>
              <li>산학협력프로젝트 소개</li>
              <li>산학협력 과제 제안</li>
              <li>프로젝트 QnA</li>
            </ul>
          </div>
        </div>
        <div className={styles.shortcuts}>
          <div>
            <Link href="/#">VR 바로가기</Link>
          </div>
          <div>
            <Link href="https://www.skku.edu/skku/index.do">성균관대학교</Link>
            <Link href="https://sw.skku.edu/sw/index.do">소프트웨어융합대학</Link>
            <Link href="https://skb.skku.edu/swuniv/index.do">SW중심대학 사업단</Link>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { Banner } from "@/components/common/Banner/Banner";
// import { VRLink } from "@/components/common/VRLink";
import { VerticalGapBox } from "@/components/pages/VerticalGapBox";
import { bannerList } from "@/constants/BannerList";
import styles from "./Main.module.css";
import { Stack } from "@mantine/core";
import { MainArticle } from "./(utils)";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { IProjectContent } from "@/types/project";
import { ITalkContent } from "@/types/talks";
import { IGalleryContent } from "@/types/galleries";
import { useWindowSize } from "@/hooks/useWindowSize";
import { GenerateCardsRow, getItemCountPerRow } from "@/components/pages/ItemGrid";
import { getFileUrlById } from "@/utils/handleDownloadFile";
import { CommonAxios } from "@/utils/CommonAxios";
import { useAuth } from "@/components/common/Auth";

type Content = IProjectContent | ITalkContent | IGalleryContent;

export default function Home() {
  /**
   * 배너 정보
   * /(root)에 해당하는 배너 정보를 bannerList로부터 가져와 저장함.
   *
   * item.type는 Banner.tsx > ImageType에 정의되어 있음.
   */
  const S_TOP_BANNER_INFO = bannerList.find((item) => item.type === "S_TOP")!;

  const projectHeadData = useRef<IProjectContent[]>([]);
  const projectThumbnails = useRef<string[]>([]);
  const projectIsLikes = useRef<boolean[]>([]);
  const projectIsMarks = useRef<boolean[]>([]);

  const talkHeadData = useRef<ITalkContent[]>([]);
  const talkThumbnails = useRef<string[]>([]);
  const talkIsMarks = useRef<boolean[]>([]);

  const galleryHeadData = useRef<IGalleryContent[]>([]);
  const galleryThumbnails = useRef<string[]>([]);

  /**
   * 프로젝트, 대담영상, 갤러리 데이터와 사진까지 모두 가져왔는지 여부를 확인함.
   * - false: 사진을 다운받고 있는 중으로 유저 화면에선 Loading에 해당하는 화면이 나옴.
   * - true: 모두 로드되었다는 뜻으로 한 번에 일괄적으로 프로젝트 목록이 보여짐.
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * 반응형 디자인을 위한 screen width와 height
   * - width: 프로젝트 아이템이 한 줄에 몇 개가 배치되는지 screen width에 따라 달라지므로
   * 숫자를 맞추기 위해 채워야 하는 더미 아이템을 dynamic하게 만들어 그리드를 유지하는 역할을 수행함.
   */
  const { width: screenWidth } = useWindowSize();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const targets = [
      { type: "PROJECT", url: "/projects" },
      { type: "TALK", url: "/talks" },
      { type: "GALLERY", url: "/galleries" },
    ];

    const dataSources = [
      { headData: projectHeadData, thumbnail: projectThumbnails, type: "PROJECT" },
      { headData: talkHeadData, thumbnail: talkThumbnails, type: "TALK" },
      { headData: galleryHeadData, thumbnail: galleryThumbnails, type: "GALLERY" },
    ];

    const fetchThumbnails = async (items: Content[], type: string) => {
      switch (type) {
        case "PROJECT":
          return Promise.all(
            (items as IProjectContent[]).map((item) => getFileUrlById(item.thumbnailInfo.id))
          );
        case "TALK":
          return (items as ITalkContent[]).map(
            (item) => `https://www.youtube.com/embed/${item.youtubeId}`
          );
        case "GALLERY":
          return Promise.all(
            (items as IGalleryContent[]).map((item) => getFileUrlById(item.files[0].id))
          );
        default:
          return [];
      }
    };

    const fetchData = async () => {
      const promises = dataSources.map(async ({ headData, thumbnail, type }) => {
        try {
          const target = targets.find((item) => item.type === type);
          if (!target) throw new Error(`Target not found for type: ${type}`);

          const data = await fetcher({ url: target.url, query: { page: 0, size: 4 } });
          headData.current = data.content;

          thumbnail.current = await fetchThumbnails(data.content, type);
        } catch {
          thumbnail.current = [];
        }
      });

      try {
        await Promise.all(promises);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Banner {...S_TOP_BANNER_INFO} />
      {/* <VRLink /> */}
      <VerticalGapBox gap="30px" />
      <Stack className={styles.container} align="center" gap="30px">
        {!loaded ? (
          <div>Loading...</div>
        ) : (
          <>
            <MainArticle
              className={styles.project}
              title={{ text: "프로젝트", align: "left" }}
              detailUri={{ uri: "/projects", align: "left" }}
              itemHead={[
                (() => {
                  const headData = projectHeadData.current;
                  const rowCount = getItemCountPerRow(screenWidth);

                  const props = headData.map((data, idx) => {
                    projectIsLikes.current[idx] = data.like;
                    projectIsMarks.current[idx] = data.bookMark;
                    const thumbnailUrl = projectThumbnails.current[idx];
                    const handleClickLike = () => {
                      if (projectIsLikes.current[idx]) {
                        // 좋아요 취소할 경우
                        projectIsLikes.current[idx] = false;
                        CommonAxios.delete(`/projects/${data.id}/like`);
                      } else {
                        // 좋아요 추가할 경우
                        projectIsLikes.current[idx] = true;
                        CommonAxios.post(`/projects/${data.id}/like`);
                      }
                    };
                    const handleClickMark = () => {
                      if (projectIsMarks.current[idx]) {
                        // 북마크 취소할 경우
                        projectIsMarks.current[idx] = false;
                        CommonAxios.delete(`/projects/${data.id}/favorite`);
                      } else {
                        // 북마크 추가할 경우
                        projectIsMarks.current[idx] = true;
                        CommonAxios.post(`/projects/${data.id}/favorite`);
                      }
                    };
                    return {
                      data,
                      thumbnailUrl,
                      onClickLike: handleClickLike,
                      onClickBookmark: handleClickMark,
                    };
                  });

                  return (
                    <GenerateCardsRow
                      key="generate-projects-cards-row"
                      type="PROJECT"
                      props={props}
                      length={headData.length}
                      rowCount={rowCount}
                      cardWidth="300px"
                    />
                  );
                })(),
              ]}
            />

            <MainArticle
              className={styles.interview}
              title={{ text: "스타트업 대담 영상", align: "left" }}
              detailUri={{ uri: "/interviews", align: "left" }}
              itemHead={[
                (() => {
                  const headData = talkHeadData.current;
                  const rowCount = getItemCountPerRow(screenWidth);

                  const props = headData.map((data, idx) => {
                    talkIsMarks.current[idx] = data.favorite;
                    const videoUrl = talkThumbnails.current[idx];
                    const handleClickMark = () => {
                      if (isLoggedIn) {
                        if (talkIsMarks.current[idx]) {
                          // 북마크 취소할 경우
                          talkIsMarks.current[idx] = false;
                          CommonAxios.delete(`/talks/${data.id}/favorite`);
                        } else {
                          // 북마크 추가할 경우
                          talkIsMarks.current[idx] = true;
                          CommonAxios.post(`/talks/${data.id}/favorite`);
                        }
                      } else {
                        alert("대담영상을 북마크에 추가하려면 로그인이 필요합니다.");
                      }
                    };
                    return {
                      id: data.id,
                      title: data.title,
                      subtitle: data.talkerName,
                      videoUrl,
                      bookmarked: data.favorite,
                      onBookmarkToggle: handleClickMark,
                      isLoggedIn: isLoggedIn,
                    };
                  });

                  return (
                    <GenerateCardsRow
                      key="generate-talks-cards-row"
                      type="TALK"
                      props={props}
                      length={headData.length}
                      rowCount={rowCount}
                      cardWidth="300px"
                    />
                  );
                })(),
              ]}
            />

            <MainArticle
              className={styles.gallery}
              title={{ text: "갤러리", align: "left" }}
              detailUri={{ uri: "/event/gallery", align: "left" }}
              itemHead={[
                (() => {
                  const headData = galleryHeadData.current;
                  const rowCount = getItemCountPerRow(screenWidth);

                  const props = headData.map((data, idx) => {
                    const imgUrl = galleryThumbnails.current[idx];
                    return {
                      title: data.title,
                      imgUrl,
                      date: new Date(data.createdAt),
                      viewCount: data.hitCount,
                    };
                  });

                  return (
                    <GenerateCardsRow
                      key="generate-gallery-cards-row"
                      type="GALLERY"
                      props={props}
                      length={headData.length}
                      rowCount={rowCount}
                      cardWidth="300px"
                    />
                  );
                })(),
              ]}
            />
          </>
        )}
      </Stack>
      <VerticalGapBox gap="60px" />
    </main>
  );
}

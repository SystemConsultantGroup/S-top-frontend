"use client";

import { Banner } from "@/components/common/Banner/Banner";
import { VRLink } from "@/components/common/VRLink";
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

  const talkHeadData = useRef<ITalkContent[]>([]);
  const talkThumbnails = useRef<string[]>([]);

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

  useEffect(() => {
    const targets = [
      {
        type: "PROJECT",
        url: "/projects",
      },
      {
        type: "TALK",
        url: "/talks",
      },
      {
        type: "GALLERY",
        url: "/galleries",
      },
    ];

    const dataSources = [
      { headData: projectHeadData, thumbnail: projectThumbnails, type: "PROJECT" },
      { headData: talkHeadData, thumbnail: talkThumbnails, type: "TALK" },
      { headData: galleryHeadData, thumbnail: galleryThumbnails, type: "GALLERY" },
    ];

    const fetchThumbnails = async (items: Content[], type: string) => {
      if (type === "PROJECT") {
        // return Promise.all(
        //   (items as IProjectContent[]).map(
        //     async (item) => await getFileUrlById(item.thumbnailInfo.id)
        //   )
        // );
        /** TODO: minio 대체 */
        return Array(items.length).fill(
          "https://www.hellot.net/data/photos/20231252/art_17039301013143_a3d6ec.jpg"
        );
      } else if (type === "TALK") {
        return (items as ITalkContent[]).map(
          (item) => `https://www.youtube.com/embed/${item.youtubeId}`
        );
      } else if (type === "GALLERY") {
        // return Promise.all(
        //   (items as IGalleryContent[]).map(async (item) => await getFileUrlById(item.files[0].id))
        // );
        /** TODO: minio 대체 */
        return Array(items.length).fill(
          "https://www.hellot.net/data/photos/20231252/art_17039301013143_a3d6ec.jpg"
        );
      }
    };

    const fetchData = async () => {
      const promises = dataSources.map(async ({ headData, thumbnail, type }) => {
        const data = await fetcher({
          url: targets.find((item) => item.type === type)!.url,
          query: { page: 0, size: 4 },
        });
        headData.current = data.content;

        const thumbnails = await fetchThumbnails(data.content, type);
        thumbnail.current = thumbnails as string[];
      });

      await Promise.all(promises);
      setLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <main>
      <Banner {...S_TOP_BANNER_INFO} />
      <VRLink />
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
                    const thumbnailUrl = projectThumbnails.current[idx];
                    return { data, thumbnailUrl };
                  });

                  return (
                    <GenerateCardsRow
                      key="generate-projects-cards-row"
                      type="PROJECT"
                      props={props}
                      length={headData.length}
                      rowCount={rowCount}
                      cardWidth="320px"
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
                    const videoUrl = talkThumbnails.current[idx];
                    return {
                      title: data.title,
                      subtitle: data.talkerName,
                      videoUrl,
                      bookmarked: data.favorite,
                    };
                  });

                  return (
                    <GenerateCardsRow
                      key="generate-talks-cards-row"
                      type="TALK"
                      props={props}
                      length={headData.length}
                      rowCount={rowCount}
                      cardWidth="320px"
                    />
                  );
                })(),
              ]}
            />

            <MainArticle
              className={styles.gallery}
              title={{ text: "갤러리", align: "center" }}
              detailUri={{ uri: "/event/gallery", align: "right" }}
              itemHead={[
                (() => {
                  const headData = galleryHeadData.current;
                  const rowCount = getItemCountPerRow(screenWidth);

                  const props = headData.map((data, idx) => {
                    const imgUrl = galleryThumbnails.current[idx];
                    return {
                      title: data.title,
                      imgUrl,
                      date: new Date(data.updatedAt),
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
                      cardWidth="320px"
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

"use client";

import { Banner } from "@/components/common/Banner/Banner";
import { VerticalGapBox } from "@/components/pages/VerticalGapBox";
import { bannerList } from "@/constants/BannerList";
import { PROJECT_YEAR_LIST } from "@/constants/TextMapping";
import { useProjects } from "@/hooks/swr/useProjects";
import { IProjectRequestParams, ProjectType, ProjectCategory } from "@/types/project";
import { Stack, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { IOption } from "./type";
import styles from "./Projects.module.css";
import { ProjectBoard, ProjectFilterBox, ProjectSelectTab } from "./(utils)";
import { getFileUrlById } from "@/utils/handleDownloadFile";

export default function ProjectsPage() {
  /**
   * 배너 정보
   * /projects에 해당하는 배너 정보를 bannerList로부터 가져와 저장함.
   *
   * item.type는 Banner.tsx > ImageType에 정의되어 있음.
   */
  const PROJECT_BANNER_INFO = bannerList.find((item) => item.type === "PROJECT")!;

  /** 한 페이지 당 아이템 개수 */
  const [pageSize] = useState(20);
  /** 페이지네이션 페이지 숫자 */
  const [pageNumber, setPageNumber] = useState(1);
  /** 쿼리 정보 */
  const [query, setQuery] = useDebouncedState<IProjectRequestParams>(
    {
      page: pageNumber - 1,
      size: pageSize,
    },
    300
  );

  /** SWR 훅으로 프로젝트 목록 가져오기 */
  const { data, pageData } = useProjects({
    params: { ...query, page: pageNumber - 1, size: pageSize },
  });

  /**
   * 프로젝트 데이터와 사진까지 모두 가져왔는지 여부를 확인함.
   * - false: 사진을 다운받고 있는 중으로 유저 화면에선 Loading에 해당하는 화면이 나옴.
   * - true: 모두 로드되었다는 뜻으로 한 번에 일괄적으로 프로젝트 목록이 보여짐.
   */
  const [loaded, setLoaded] = useState(false);
  /** 프로젝트에 대한 사진을 render 이전에 미리 리스트에 저장함. */
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  /**
   * 반응형 디자인을 위한 screen width와 height
   * - width: 프로젝트 아이템이 한 줄에 몇 개가 배치되는지 screen width에 따라 달라지므로
   * 숫자를 맞추기 위해 채워야 하는 더미 아이템을 dynamic하게 만들어 그리드를 유지하는 역할을 수행함.
   */
  //const { width: screenWidth } = useWindowSize();

  /**
   * 탭 정보
   * - 0: S-TOP 이벤트 프로젝트 (당해년도 프로젝트)
   * - 1: 전체 프로젝트
   */
  const [tab, setTab] = useState(0);

  /** 프로젝트 필터링 state */
  const [options, setOptions] = useState<IOption[]>([]);

  /** 변경된 프로젝트 데이터에 따라 사진 정보를 업데이트함. */
  useEffect(() => {
    if (data && data.length) {
      const loadImages = async () => {
        const promises = data.map((item) => getFileUrlById(item.thumbnailInfo.id));
        const urls = await Promise.all(promises);
        setThumbnails(urls);
      };
      loadImages();
      setLoaded(true);
    }
  }, [data]);

  /** 프로젝트 필터링 state 값이 바뀌었을 때 백엔드에 접근하여 필터링된 데이터를 가져옴. */
  useEffect(() => {
    const yearOptionsList: number[] = [];
    const typeOptionsList: ProjectType[] = [];
    const categoryOptionsList: ProjectCategory[] = [];

    options.forEach((option) => {
      switch (option.key) {
        case "YEAR":
          yearOptionsList.push(Number(option.value));
          break;
        case "TYPE":
          typeOptionsList.push(option.value as ProjectType);
          break;
        case "CATEGORY":
          categoryOptionsList.push(option.value as ProjectCategory);
          break;
      }
    });

    if (tab === 0) yearOptionsList.push(Number(PROJECT_YEAR_LIST[0]));

    setQuery((prev) => ({
      ...prev,
      year: yearOptionsList.length ? yearOptionsList.join(",") : null,
      type: typeOptionsList.join(",") || null,
      category: categoryOptionsList.join(",") || null,
    }));
  }, [tab, options]);

  return (
    <main>
      <Banner {...PROJECT_BANNER_INFO} />
      <VerticalGapBox gap="30px" />
      <Stack className={styles.container} align="center" gap="30px">
        {/* 프로젝트 탭 선택 */}
        <ProjectSelectTab setOptions={setOptions} tab={tab} setTab={setTab} />
        {/* 필터링 박스 */}
        <ProjectFilterBox setQuery={setQuery} tab={tab} options={options} setOptions={setOptions} />
        {/* 프로젝트 아이템 */}
        <ProjectBoard data={data} loaded={loaded} thumbnails={thumbnails} />
        {/* 페이지네이션 */}
        {pageNumber && setPageNumber && pageData && (
          <Pagination value={pageNumber} onChange={setPageNumber} total={pageData.totalPages} />
        )}
      </Stack>
      <VerticalGapBox gap="60px" />
    </main>
  );
}

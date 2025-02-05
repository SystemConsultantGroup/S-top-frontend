"use client";

import { Gallery } from "@/types/gallery";
import classes from "./GallerySection.module.css";
import { useEffect, useState } from "react";
import { CommonAxios } from "@/utils/CommonAxios";
import { getFileUrlById } from "@/utils/handleDownloadFile";
import { ApiFile } from "@/types/file";
import { Flex, Group, Text } from "@mantine/core";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Props {
  galleryId: number;
}

export function GallerySection({ galleryId }: Props) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0); // page 내의 index
  const [size, setSize] = useState(6); // 페이지당 아이템 수
  const [startIdx, setStartIdx] = useState<number>(0);
  const [endIdx, setEndIdx] = useState<number>(0);

  /* 갤러리 가져오기 */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await CommonAxios.get(`/galleries/${galleryId}`);
        setGallery(response.data);

        /* 갤러리 이미지 url 가져오기 */
        const promises = response.data.files.map((fileItem: ApiFile) =>
          getFileUrlById(fileItem.id)
        );
        const urlResults = await Promise.all(promises);
        setImgUrls(urlResults);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, [galleryId]);

  /* startIdx, endIdx 초기화 */
  useEffect(() => {
    if (gallery) {
      setStartIdx(0);
      setEndIdx(gallery.files.length < size ? gallery.files.length : size - 1);
    }
  }, [gallery, size]);

  const formatDate = (inputDate: string | undefined) => {
    if (inputDate) {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}.${month}.${day}`;
    }
    return "";
  };

  /* 모바일 뷰에 따른 이미지 list 개수 조정 */
  useEffect(() => {
    const updateItemsPerPage = () => {
      setSize(window.innerWidth <= 768 ? 3 : 6); // 모바일: 3개, 데스크탑: 6개
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage); // 화면 크기 변경 이벤트
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const currentItems = gallery ? gallery.files.slice(startIdx, endIdx + 1) : [];

  const onClickLeftArrow = () => {
    if (gallery) {
      const globalIdx = startIdx + selectedImgIdx;
      if (globalIdx == 0) return;

      // 이미지 개수가 size 초과이고 현재 왼쪽 끝인 경우 왼쪽으로 한 칸씩 밀기
      if (gallery.files.length > size && selectedImgIdx == 0) {
        console.log("왼쪽끝!!");
        setStartIdx((prev) => prev - 1);
        setEndIdx((prev) => prev - 1);
        setSelectedImgIdx(0);
      } else {
        setSelectedImgIdx((prev) => prev - 1);
      }
    }
  };
  const onClickRightArrow = () => {
    if (gallery) {
      const globalIdx = startIdx + selectedImgIdx;
      if (globalIdx == gallery.files.length - 1) return;

      // 이미지 개수가 size 초과이고 현재 오른쪽 끝인 경우 오른쪽으로 한 칸씩 밀기
      if (gallery.files.length > size && selectedImgIdx == size - 1) {
        setStartIdx((prev) => prev + 1);
        setEndIdx((prev) => prev + 1);
        setSelectedImgIdx(size - 1);
      } else {
        setSelectedImgIdx((prev) => prev + 1);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Group className={classes.top}>
        <Text className={classes.title}>{gallery?.title ?? ""}</Text>
        <Text className={classes.date} c="dimmed">
          {formatDate(gallery?.createdAt) ?? ""}
        </Text>
      </Group>
      <Group className={classes.selectedImgContainer}>
        {gallery && gallery.files.length > 0 && selectedImgIdx >= 0 && (
          <>
            <Image
              alt="selected image"
              src={imgUrls[startIdx + selectedImgIdx]}
              layout="intrinsic"
              width={1000} // 부모 컨테이너에 맞춰 비율 조정
              height={0}
              className={classes.image}
              priority
            />
            {/* 왼쪽 화살표 */}
            {startIdx + selectedImgIdx > 0 && (
              <IconArrowLeft className={classes.arrowLeft} onClick={onClickLeftArrow} />
            )}
            {/* 오른쪽 화살표 */}
            {startIdx + selectedImgIdx < gallery.files.length - 1 && (
              <IconArrowRight className={classes.arrowRight} onClick={onClickRightArrow} />
            )}
          </>
        )}
      </Group>
      <Flex className={classes.imgList} justify="center" align="flex-start" gap="sm">
        {gallery &&
          currentItems.length > 1 &&
          currentItems.map((item, idx) => {
            const globalIdx = startIdx + idx;
            const isSelected = selectedImgIdx === idx;
            return (
              <div
                key={idx}
                className={classes.imgContainer}
                onClick={() => setSelectedImgIdx(idx)}
              >
                <Image
                  src={imgUrls[globalIdx]}
                  alt="image"
                  width={80}
                  height={60}
                  style={{ width: gallery.files.length <= 2 ? "60%" : "100%", height: "auto" }}
                  className={`${isSelected ? classes.selected : ""}`}
                  priority
                />
              </div>
            );
          })}
      </Flex>
    </div>
  );
}

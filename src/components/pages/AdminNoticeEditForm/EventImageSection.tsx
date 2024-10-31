"use client";

import { getFileUrlById } from "@/utils/handleDownloadFile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";

export function EventImageSection({ fileIds }: { fileIds: number[] }) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (fileIds) {
        const urls = await Promise.all(
          fileIds.map(async (fileId) => {
            return getFileUrlById(fileId);
          })
        );
        setUrls(urls);
      }
    };
    fetchImages();
  }, [fileIds]);

  const slides = urls.map((src, index) => (
    <CarouselSlide key={index}>
      <Image src={src} alt={"Event Image"} width={300} height={400} />
    </CarouselSlide>
  ));

  return (
    <section style={{ marginBottom: "30px", maxWidth: "700px" }}>
      <Carousel slideSize="50%" align="start" slidesToScroll={2} withIndicators>
        {slides}
      </Carousel>
    </section>
  );
}

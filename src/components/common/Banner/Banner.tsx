import Image from "next/image";
import classes from "./Banner.module.css";
import { Group, Stack } from "@mantine/core";

export type ImageType = "AI_HUB" | "IND_UNIV_PROJECT" | "INTERVIEW" | "PROJECT" | "S_TOP";
export type ImageLocationLookupTable = Record<ImageType, string>;
export const IMAGE_LOCATION_LOOKUP_TABLE: ImageLocationLookupTable = {
  AI_HUB: "/images/aihub.png",
  IND_UNIV_PROJECT: "/images/ind-univ-project.png",
  INTERVIEW: "/images/interview.png",
  PROJECT: "/images/project.png",
  S_TOP: "/images/s-top.png",
};

export interface BannerProps {
  type: ImageType;
  title: string;
  subtitle?: string;
  text: string;
  width?: string;
  height?: string;
}
export function Banner({ type, title, subtitle, text, width, height }: BannerProps) {
  return (
    <div className={classes.container} style={{ width: width, height: height }}>
      <Image
        className={classes.img}
        src={IMAGE_LOCATION_LOOKUP_TABLE[type]}
        alt={"Banner Image"}
        objectFit="contain"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      ></Image>
      <Group className={classes.group} gap={0}>
        <Stack className={classes.stack} align="flex-start" p={50} gap={0}>
          <div className={classes.title}>{title}</div>
          <div className={classes.subtitle}>{subtitle}</div>
        </Stack>
        <div className={classes.text}>{text}</div>
      </Group>
    </div>
  );
}

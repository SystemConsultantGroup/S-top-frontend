"use client";
import {
  Card,
  Text,
  Flex,
  CardSection,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";
import classes from "./GalleryPreview.module.css";

export interface Props {
  imgUrl: string;
  title: string;
  date: Date;
  viewCount?: number;
  height?: number;
  width?: number;
}
function formatDate(date: Date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function GalleryPreview({
  imgUrl,
  title,
  date,
  viewCount,
  height = 180,
  width = 300,
}: Props) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // text color와 맞추기
  const dimmedColor = colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];

  return (
    <>
      <Card padding="2px" radius="md" style={{ paddingBottom: 10 }}>
        <CardSection className={classes.image_section}>
          <Image
            src={imgUrl}
            alt="gallery preview image"
            height={height - 2}
            width={width - 4}
            className={classes.image_view}
          />
        </CardSection>

        <Text fw={700} size="lg" mt="md" className={classes.title}>
          {title}
        </Text>

        <Flex justify="space-between" mt="xs">
          <Text c="dimmed" size="sm">
            {formatDate(date)}
          </Text>
          {(viewCount || viewCount == 0) && (
            <Flex align="center">
              <IconEye size={18} className={classes.viewcount_icon} color={dimmedColor} />
              <Text c="dimmed" size="sm">
                {viewCount}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>
    </>
  );
}

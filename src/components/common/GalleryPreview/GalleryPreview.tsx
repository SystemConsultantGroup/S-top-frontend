import { Card, Text, Flex } from "@mantine/core";
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

export function GalleryPreview({ imgUrl, title, date, viewCount }: Props) {

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  return (
    <>
      <Card className={classes.card} withBorder>
        <div className={classes.image_section}>
          <Image
            src={imgUrl}
            alt="gallery preview image"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 300px"
            className={classes.image_view}
            priority
          />
        </div>

        <Text fw={700} size="lg" mt="md" className={classes.title}>
          {title}
        </Text>

        <Flex justify="space-between" mt="xs" className={classes.bottom}>
          <Text c="dimmed" size="sm">
            {formatDate(date)}
          </Text>
          {viewCount && (
            <Flex align="center">
              <IconEye size={18} className={classes.viewcount_icon} />
              <Text c="dimmed" size="sm" className={classes.viewcount}>
                {viewCount}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>
    </>
  );
}

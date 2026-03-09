import { Card, Text, Flex } from "@mantine/core";
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";
import classes from "./GalleryPreview.module.css";

export interface Props {
  imgUrl: string;
  title: string;
  year: number;
  month: number;
  viewCount?: number;
  height?: number;
  width?: number;
}

export function GalleryPreview({ imgUrl, title, year, month, viewCount }: Props) {
  function formatDate(year: number, month: number) {
    if (year && month) {
      const formattedMonth = String(month).padStart(2, "0");
      return `${year}.${formattedMonth}`;
    }
    return "";
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
            {formatDate(year, month)}
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

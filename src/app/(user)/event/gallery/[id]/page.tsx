import { GallerySection } from "@/components/pages/EventGallery";
import classes from "./page.module.css";
import { Text } from "@mantine/core";

interface Props {
  params: {
    id: number;
  };
}

export default function GalleryDetailPage({ params: { id } }: Props) {
  return (
    <div className={classes.container}>
      <Text className={classes.title}>갤러리</Text>
      <GallerySection galleryId={id} />
    </div>
  );
}

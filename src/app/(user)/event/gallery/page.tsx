import { Text } from "@mantine/core";
import { GalleryListSection } from "@/components/pages/EventGallery";
import classes from "./page.module.css";

export default function GalleryPage() {
  return (
    <div className={classes.container}>
      <Text className={classes.title}>갤러리</Text>
      <GalleryListSection />
    </div>
  );
}

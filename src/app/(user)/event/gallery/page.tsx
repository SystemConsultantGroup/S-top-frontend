import { Text } from "@mantine/core";
import { GalleryListSection } from "@/components/pages/EventGallery";
import classes from "./page.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { bannerList } from "@/constants/BannerList";

export default function GalleryPage() {
  const S_TOP_BANNER_INFO = bannerList.find((item) => item.type === "S_TOP")!;
  return (
    <>
      <SubHeadNavbar title="Events" />
      <Banner {...S_TOP_BANNER_INFO} />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Text className={classes.title}>갤러리</Text>
          <GalleryListSection />
        </div>
      </div>
    </>
  );
}

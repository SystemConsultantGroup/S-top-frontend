import { Text } from "@mantine/core";
import { EventAwardView } from "@/components/pages/EventAwardView/EventAwardView";
import classes from "./page.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { bannerList } from "@/constants/BannerList";

export default function EventAwardPage() {
  const S_TOP_BANNER_INFO = bannerList.find((item) => item.type === "S_TOP")!;
  return (
    <>
      <SubHeadNavbar title="Events" />
      <Banner {...S_TOP_BANNER_INFO} />
      <div className={classes.container}>
        <Text className={classes.title}>작품 수상 결과</Text>
        <EventAwardView />
      </div>
    </>
  );
}

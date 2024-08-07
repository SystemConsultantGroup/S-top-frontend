import { Header } from "@/components/common/Header";
import { BannerList } from "./BannerList";
import { Banner } from "@/components/common/Banner/Banner";

export function Main() {
  const AIHUB_BANNER_INFO = BannerList.find((item) => item.type === "AI_HUB")!;

  return (
    <>
      <Header />
      <Banner {...AIHUB_BANNER_INFO} />
      {/* Projects */}
      {/* Startup Interviews */}
      {/* Gallery */}
      {/* Footer */}
    </>
  );
}

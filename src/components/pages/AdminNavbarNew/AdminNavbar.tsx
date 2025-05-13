import {
  Icon,
  IconArrowUpRight,
  IconBrandTabler,
  IconCalendarClock,
  IconChartBarPopular,
  IconComponents,
  IconDashboard,
  IconStack2,
  IconUsers,
} from "@tabler/icons-react";
import { Group, Code, ScrollArea, Box, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classes from "./AdminNavbar.module.css";
import { LinksGroup } from "./NavbarLinksGroup";

export interface IAdminNavData {
  label: string;
  subtitle?: string;
  icon: Icon;
  href?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const mockData: IAdminNavData[] = [
  {
    label: "대시보드",
    icon: IconBrandTabler,
    href: getLink(),
  },
  {
    label: "가입 신청 관리",
    subtitle: "가입 신청",
    icon: IconUsers,
    href: getLink("/applications"),
  },
  {
    label: "이벤트 기간 설정",
    subtitle: "이벤트 기간",
    icon: IconCalendarClock,
    href: getLink("/event-period"),
  },
  {
    label: "프로젝트 관리",
    subtitle: "프로젝트",
    icon: IconStack2,
    links: [
      { label: "프로젝트 조회 및 수정", link: getLink("/projects") },
      { label: "프로젝트 등록", link: getLink("/projects/create") },
      { label: "과제 제안 관리", link: getLink("/projects/proposals") },
      { label: "프로젝트 문의 관리", link: getLink("/projects/inquiries") },
    ],
  },
  {
    label: "게시판 관리",
    subtitle: "게시판",
    icon: IconDashboard,
    links: [
      { label: "공지사항", link: getLink("/notices") },
      { label: "이벤트 공지사항", link: getLink("/event/notices") },
    ],
  },
  {
    label: "컨텐츠 관리",
    subtitle: "컨텐츠",
    icon: IconComponents,
    links: [
      { label: "대담 영상 관리", link: getLink("/interviews") },
      { label: "잡페어 영상 관리", link: getLink("/jobfair") },
      { label: "갤러리 관리", link: getLink("/gallery") },
      { label: "퀴즈 제출 목록", link: getLink("/quiz-list") },
    ],
  },
  {
    label: "접속 통계 관리",
    subtitle: "접속 통계",
    icon: IconChartBarPopular,
    links: [
      { label: "접속 통계", link: getLink("/accesses") },
      { label: "유입 경로 분석", link: getLink("/funnels") },
    ],
  },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const isShrinked = !useMediaQuery("(min-width: 1200px)");

  const links = mockData.map((item) => <LinksGroup {...item} key={item.label} path={pathname} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify={isShrinked ? "center" : "space-between"}>
          <Image
            alt="logo"
            src="/images/logo.png"
            width={0}
            height={0}
            style={{ width: isShrinked ? "100%" : "100px", height: "auto" }}
          />
          <Code fw={700}>v1.0.0</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UnstyledButton className={classes.control} component="a" href="/" data-disable-hover>
          <Box className={classes.linkBox}>
            <ThemeIcon variant="transparent" size={30}>
              <IconArrowUpRight className={classes.icon} size={28} stroke={1.6} />
            </ThemeIcon>
            <Box className={classes.linkLabel} data-external>
              서비스 화면으로
            </Box>
          </Box>
        </UnstyledButton>
      </div>
    </nav>
  );
}

function getLink(path?: string) {
  return `/admin${path ?? ""}`;
}

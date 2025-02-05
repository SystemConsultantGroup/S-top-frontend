import { PageHeader } from "@/components/common/PageHeader";
import {
  IconUserFilled,
  IconCalendarEvent,
  IconFiles,
  IconAlignBoxLeftTop,
  IconChartDotsFilled,
} from "@tabler/icons-react";
import { Button, Grid, GridCol, Group, Text } from "@mantine/core";

const BTNSIZE = 400;
const MAINICONSIZE = 60;
const MAINTEXTSIZE = 35;
const SUBICONSIZE = 40;
const SUBTEXTSIZE = 20;

const AdminMenuList = [
  {
    label: "가입 신청 관리",
    icon: <IconUserFilled size={MAINICONSIZE} />,
    href: "/admin/applications",
  },
  {
    label: "이벤트 기간 설정",
    icon: <IconCalendarEvent size={MAINICONSIZE} />,
    href: "/admin/event-period",
  },
  {
    label: "프로젝트 관리",
    icon: <IconFiles size={MAINICONSIZE} />,
    children: [
      {
        label: (
          <>
            프로젝트<br></br>조회 및 수정
          </>
        ),
        href: "/admin/projects",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
      {
        label: "프로젝트 등록",
        href: "/admin/projects/create",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
      {
        label: <>과제 제안 관리</>,
        href: "/admin/projects/proposals",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
      {
        label: (
          <>
            프로젝트<br></br>문의 관리
          </>
        ),
        href: "/admin/projects/inquiries",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
    ],
  },
  {
    label: "게시판 관리",
    icon: <IconAlignBoxLeftTop size={MAINICONSIZE} />,
    children: [
      {
        label: "공지사항",
        href: "/admin/notices",
        icon: <IconAlignBoxLeftTop size={SUBICONSIZE} />,
      },
      {
        label: "이벤트 공지사항",
        href: "/admin/event/notices",
        icon: <IconAlignBoxLeftTop size={SUBICONSIZE} />,
      },
    ],
  },
  {
    label: "컨텐츠 관리",
    icon: <IconFiles size={MAINICONSIZE} />,
    children: [
      {
        label: (
          <>
            대담<br></br>영상 관리
          </>
        ),
        href: "/admin/interviews",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
      {
        label: (
          <>
            잡페어<br></br>영상 관리
          </>
        ),
        href: "/admin/jobfair",
        icon: <IconFiles size={SUBICONSIZE} />,
      },
      { label: "갤러리 관리", href: "/admin/gallery", icon: <IconFiles size={SUBICONSIZE} /> },
      { label: "퀴즈 제출 목록", href: "/admin/quiz-list", icon: <IconFiles size={SUBICONSIZE} /> },
    ],
  },
  {
    label: "접속 통계 관리",
    icon: <IconChartDotsFilled size={MAINICONSIZE} />,
    children: [
      {
        label: "접속 통계",
        href: "/admin/accesses",
        icon: <IconChartDotsFilled size={SUBICONSIZE} />,
      },
      {
        label: "유입 경로 분석",
        href: "/admin/funnels",
        icon: <IconChartDotsFilled size={SUBICONSIZE} />,
      },
    ],
  },
];

export default function AdminMainPage() {
  return (
    <>
      <PageHeader title="관리자 메인" />
      <Group>
        {AdminMenuList.map((e) => {
          if (e.children) {
            return (
              <>
                <Grid w={BTNSIZE}>
                  {e.children.map((c) => {
                    return (
                      <>
                        <GridCol span={6}>
                          <Button
                            h={e.children.length > 2 ? (BTNSIZE - 20) / 2 : BTNSIZE}
                            w={(BTNSIZE - 20) / 2}
                            variant="outline"
                            component="a"
                            href={c.href}
                          >
                            <Text fz={SUBTEXTSIZE.toString()}>
                              {c.icon}
                              <br></br>
                              {c.label}
                            </Text>
                          </Button>
                        </GridCol>
                      </>
                    );
                  })}
                </Grid>
              </>
            );
          } else {
            return (
              <>
                <Button h={BTNSIZE} w={BTNSIZE} variant="outline" component="a" href={e.href}>
                  <Text fz={MAINTEXTSIZE}>
                    {e.icon}
                    <br></br>
                    {e.label}
                  </Text>
                </Button>
              </>
            );
          }
        })}
      </Group>
    </>
  );
}

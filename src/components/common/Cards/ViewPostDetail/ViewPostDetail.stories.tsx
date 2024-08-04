import type { Meta, StoryObj } from "@storybook/react";

import { ViewPostDetail } from "./ViewPostDetail";

const meta = {
  component: ViewPostDetail,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ViewPostDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "[S-TOP 2024 이벤트 참여 안내]",
    subtitle: "🎊 S-TOP 2024 기술교류회에서 이벤트를 진행합니다! (2/15 ~ 2/17)",
    articles: [
      "<1> S-TOP 인스타그램 스토리 이벤트",
      "1. 인스타 계정의 ‘2024 S-TOP’ 필터로 S-TOP사이트의 원하는 페이지 촬영",
      "2. 해당 스토리에 S-TOP 사이트 링크 태그",
      "3. 친구 1명과 학생회 인스타그램(@skku_s.wing) 태그 🏷",
      "4. 스토리 게시 후 DM으로 이름과 전화번호 전송 (*비공개 계정일 경우, 해당 스토리 캡처 첨부)",
      "",
      "<2> 홈페이지 작품 투표 이벤트",
      "1. S-TOP 페이지에 로그인",
      "2. 2023년도 작품 목록에서 마음에 드는 작품에 투표 🗳",
      "3. 자동 응모 완료!*S-TOP에서 진행되는 학생투표 100%로 인기상이 선정되니 신중히 투표해주시길 바랍니다.",
      "",
      "<3> S-TOP 대담 영상 퀴즈 이벤트 (성균관대학교 소프트웨어학과/컴퓨터공학과만 참여 가능)",
      "1. <2>의 작품 투표를 선행",
      "2. 대담 영상 시청 후 퀴즈 풀기 (*총 5개의 퀴즈가 있으며, 한 영상의 퀴즈만 풀어도 이벤트에 응모됩니다.)",
      "",
      "경품은 카드뉴스를 참고바라며 2/18일 20시 소프트웨어융합대학 인스타그램에서 라이브를 통해 추첨 후 제공할 예정입니다. 많은 관심과 참여 부탁드립니다~ 😊",
    ],
  },
};

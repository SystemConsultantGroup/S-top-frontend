export interface ProjectDetailDto {
  // TODO: API 문서 참조하여 변경
  thumbnailId: number; // 프로젝트 대표 이미지
  posterId: number; // 프로젝트 포스터
  projectName: string; // 프로젝트 이름
  teamName: string; // 참가팀명
  participants: string[]; // 참여자
  professorName: string[]; // 지도교수
  description: string; // 설명
  tags: string[]; // 프로젝트 기술스택
  likes?: number; // 좋아요 개수??
  isThumbup: boolean; // 좋아요 여부
  isInterest: boolean; // 관심 프로젝트 등록 여부
  videoUrl: string; // 작품 영상
  year: number; // 연도
}

export const project: ProjectDetailDto = {
  thumbnailId: 0,
  posterId: 0,
  projectName: "보안 장비 및 서버 장애 탐지",
  description: "표준 프로토콜(ICMP, SNMP)과 로그를 이용하여 데이터 전처리 후 서버 상태 시각화",
  teamName: "스꾸딩",
  participants: ["김태균"],
  professorName: ["송상효"],
  tags: ["보안", "SW공학"],
  isThumbup: false,
  isInterest: true,
  videoUrl: "https://www.youtube.com/embed/NElCk3islhw",
  year: 2023,
};

export const comments: string[] = ["아이디어가 좋은 것 같아요!", "응원합니다!"];

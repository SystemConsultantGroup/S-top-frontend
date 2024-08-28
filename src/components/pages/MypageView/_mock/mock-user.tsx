import { MockProjectData } from "@/components/common/ProjectCard/_mock/mock-project";

export interface IUser {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  userType: string;
  affiliation: string;
  position?: string; // 교수/교직원, 기업관계자
  studentId?: string; // 학생
}

export const MockUserTypes = {
  student: "학생",
  faculty: "교수/교직원",
  corporate: "기업 관계자",
};

export const MockUserData: IUser = {
  id: 1,
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@gmail.com",
  userType: "corporate",
  affiliation: "삼성전자",
  position: "사원",
};

export const MockInterestProjects = new Array(5).fill(MockProjectData);

export const MockInterestVideos = new Array(3).fill({
  title: "뤼튼 테크놀로지스",
  subtitle: "현지웅 엔지니어님",
  videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
});

export type Role =
  | "STUDENT"
  | "PROFESSOR"
  | "COMPANY"
  | "ADMIN"
  | "INACTIVE_PROFESSOR"
  | "INACTIVE_COMPANY"
  | "OTHERS"
  | "EXTERNAL"
  | "TEMP";

export interface IUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  userType: Role;
  division?: string;
  position?: string;
  studentNumber?: string;
  departmentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IUserProposal {
  id: number;
  title: string;
  createdDate: string;
  hasReply: boolean;
}

export interface IUserInquiry {
  id: number;
  title: string;
  projectId: number;
  createdDate: string;
  hasReply: boolean;
}

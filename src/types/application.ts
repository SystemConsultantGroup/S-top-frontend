import { PagedApiResponse } from "./common";
import { Role } from "./user";

export interface Application {
  id: number;
  name: string;
  division?: string;
  position?: string;
  userType: Role;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedApplication extends Application {
  email: string;
  phone: string;
}

export interface PagedApplicationsResponse extends PagedApiResponse<Application> {}

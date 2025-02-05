import { JwtPayload } from "jwt-decode";
import { Role } from "./user";

export interface CustomJwtPayload extends JwtPayload {
  userType: Role;
}

import { ISchool } from "./school.interface";
import { IUser } from "./user.interface";

export interface IGroup {
  avatarUrl?: string;
  name?: string;
  description?: string;
  members?: IUser[] | string[];
  school?: ISchool | string;
  createdAt?: number;
  updatedAt?: number;
}

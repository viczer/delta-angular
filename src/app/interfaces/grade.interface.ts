import { IUser } from "./user.interface";
import { ISubject } from "./subject.iterface";
import { ISchool } from "./school.interface";

export interface IGrade {
  grade?: number;
  student?: IUser | string;
  subject?: ISubject | string;
  school?: ISchool | string;
  createdAt?: number;
  updatedAt?: number;
}

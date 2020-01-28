import { IUser } from "./user.interface";
import { ISchool } from "./school.interface";

export interface IFlight {
  folio?: string;
  name?: string;
  description?: string;
  startDate?: number;
  duration?: string;
  cost?: number;
  enlisted?: IUser[] | string;
  approved?: IUser[] | string[];
  school?: ISchool | string;
  authorizedBy?: IUser | string;
  createdAt?: number;
  updatedAt?: number;
}

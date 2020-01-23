import { IUser } from "./user.interface";
import { ISchool } from "./school.interface";

export interface IPayment {
  folio?: string;
  name?: string;
  description?: string;
  charge?: number;
  deadLine?: number;
  completed?: boolean;
  student?: IUser | String;
  school?: ISchool | String;
  createdAt?: number;
  updatedAt?: number;
}

import { IPayment } from "./payment.interface";
import { IGroup } from "./group.interface";
import { ISubject } from "./subject.iterface";
import { IFlight } from "./flight.interface";
import { IGrade } from "./grade.interface";
import { IUser } from "./user.interface";
import { IProgram } from "./program.interface";

export interface ISchool {
  name?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  flights?: IFlight[] | string[];
  grades?: IGrade[] | string[];
  groups?: IGroup[] | string[];
  payments?: IPayment[] | string[];
  principals?: IUser[] | string[];
  programs?: IProgram[] | string[];
  students?: IUser[] | string[];
  subjects?: ISubject[] | string[];
  createdAt?: number;
  updatedAt?: number;
}

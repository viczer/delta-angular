import { ISchool } from "./school.interface";
import { IFlight } from "./flight.interface";
import { IGrade } from "./grade.interface";
import { IGroup } from "./group.interface";
import { IPayment } from "./payment.interface";
import { IProgram } from "./program.interface";

export interface IUser {
  access_token?: string;
  enrollmentId?: string;
  role?: string;
  email?: string;
  avatarUrl?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: string;
  dob?: number;
  graduated?: boolean;
  gender?: string;
  lastSchool?: string;
  address?: {
    state?: string;
    municipality?: string;
    colony?: string;
    street?: string;
    zipCode?: string;
  };
  emergency?: {
    name?: string;
    phone?: string;
    relation?: string;
    bloodType?: string;
  };
  note?: string;
  flights?: IFlight[] | string[];
  grades?: IGrade[] | string[];
  group?: IGroup | string;
  payments?: IPayment[] | string[];
  program?: IProgram | string;
  schools?: ISchool[] | string[];
  enrolled?: number;
  createdAt?: number;
  updatedAt?: number;
}

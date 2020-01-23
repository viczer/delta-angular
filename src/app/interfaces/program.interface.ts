import { ISchool } from "./school.interface";
import { ISubject } from "./subject.iterface";

export interface IProgram {
  folio?: string;
  name?: string;
  description?: string;
  avatarUrl?: string;
  email?: string;
  inscription?: number;
  monthlyRate?: number;
  startDate?: number;
  endDate?: number;
  subjects?: ISubject[] | string[];
  school?: ISchool | string;
  createdAt?: number;
  updatedAt?: number;
}

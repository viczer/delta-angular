import { IGrade } from "./grade.interface";
import { ISchool } from "./school.interface";
import { IProgram } from "./program.interface";

export interface ISubject {
  folio?: string;
  name?: string;
  description?: string;
  avatarUrl?: string;
  email?: string;
  grades?: IGrade[] | string[];
  school?: ISchool | string;
  programs?: IProgram[] | string[];
  createdAt?: number;
  updatedAt?: number;
}

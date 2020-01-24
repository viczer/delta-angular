import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";
import { IProgram } from "../interfaces/program.interface";

@Injectable({
  providedIn: "root"
})
export class AcademicsService {
  private headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: ""
  };

  private schoolId;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticated$.subscribe(status => {
      this.headers.Authorization = `bearer ${status.access_token}`;
      this.schoolId = status.schools[0];
    });
  }

  ////////////////////////////////////////
  //         FIND FUNCTIONS
  ////////////////////////////////////////

  public findAll() {
    let configUrl = `${server.SERVER_URL}programs/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(academicId: string) {
    let configUrl = `${server.SERVER_URL}programs/${academicId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  ////////////////////////////////////////
  //        CREATE FUNCTIONS
  ////////////////////////////////////////

  public createOne(program: IProgram) {
    program.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}programs`;
    return this.http.post(configUrl, program, { headers: this.headers });
  }

  ////////////////////////////////////////
  //        UPDATE FUNCTIONS
  ////////////////////////////////////////

  public updateOne(academicId: string, program: IProgram) {
    let configUrl = `${server.SERVER_URL}programs/${academicId}`;
    return this.http.put(configUrl, program, {
      headers: this.headers
    });
  }

  ////////////////////////////////////////
  //        DELETE FUNCTIONS
  ////////////////////////////////////////

  public deleteOne(academicId: string) {
    let configUrl = `${server.SERVER_URL}programs/${academicId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }

  ////////////////////////////////////////
  //        CHILD FUNCTIONS
  ////////////////////////////////////////

  public addSubject(academicId: string, subjectId: string) {
    let configUrl = `${server.SERVER_URL}programs/${academicId}/subject/${subjectId}`;
    return this.http.put(configUrl, null, { headers: this.headers });
  }

  public removeSubject(academicId: string, subjectId: string) {
    let configUrl = `${server.SERVER_URL}programs/${academicId}/subject/${subjectId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
  ////////////////////////////////////////
  //        VALIDATION FUNCTIONS
  ////////////////////////////////////////

  public checkFolio(folio: string) {
    let configUrl = `${server.SERVER_URL}programs/folio/${folio}`;
    return this.http.get(configUrl, { headers: this.headers });
  }
}

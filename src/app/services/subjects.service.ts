import { Injectable } from "@angular/core";
import { ISubject } from "../interfaces/subject.iterface";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";

@Injectable({
  providedIn: "root"
})
export class SubjectsService {
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

  public findAll() {
    let configUrl = `${server.SERVER_URL}subjects/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findAllInProgram(programId: string) {
    let configUrl = `${server.SERVER_URL}subjects/program/${programId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(subjectId: string) {
    let configUrl = `${server.SERVER_URL}subjects/${subjectId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(subject: ISubject) {
    subject.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}subjects`;
    return this.http.post(configUrl, subject, { headers: this.headers });
  }

  public checkFolio(folio: string) {
    let configUrl = `${server.SERVER_URL}subjects/folio/${folio}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public updateOne(subjectId: string, subject: ISubject) {
    let configUrl = `${server.SERVER_URL}subjects/${subjectId}`;
    return this.http.put(configUrl, subject, {
      headers: this.headers
    });
  }

  public deleteOne(subjectId: string) {
    let configUrl = `${server.SERVER_URL}subjects/${subjectId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}

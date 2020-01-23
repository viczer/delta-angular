import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";
import { IGrade } from "../interfaces/grade.interface";

@Injectable({
  providedIn: "root"
})
export class GradesService {
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
    let configUrl = `${server.SERVER_URL}grades/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(gradeId: string) {
    let configUrl = `${server.SERVER_URL}grades/${gradeId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findAllInSubject(subjectId: string) {
    let configUrl = `${server.SERVER_URL}grades/subject/${subjectId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(grade: IGrade) {
    grade.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}grades`;
    return this.http.post(configUrl, grade, { headers: this.headers });
  }

  public updateOne(gradeId: string, grade: IGrade) {
    let configUrl = `${server.SERVER_URL}grades/${gradeId}`;
    return this.http.put(configUrl, grade, {
      headers: this.headers
    });
  }

  public deleteOne(gradeId: string) {
    let configUrl = `${server.SERVER_URL}grades/${gradeId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}

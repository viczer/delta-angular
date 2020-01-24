import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class StudentService {
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

  public findAll(graduated: boolean = false) {
    let configUrl = `${server.SERVER_URL}students/school/${this.schoolId}?graduated=${graduated}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findAllInGroup(groupId: string) {
    let configUrl = `${server.SERVER_URL}students/group/${groupId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(studentId: string) {
    let configUrl = `${server.SERVER_URL}students/${studentId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(user: IUser) {
    user.schools = [this.schoolId];
    let configUrl = `${server.SERVER_URL}students`;
    return this.http.post(configUrl, user, { headers: this.headers });
  }

  public updateOne(studentId: string, user: IUser) {
    let configUrl = `${server.SERVER_URL}students/${studentId}`;
    return this.http.put(configUrl, user, {
      headers: this.headers
    });
  }

  public deleteOne(studentId: string) {
    let configUrl = `${server.SERVER_URL}students/${studentId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}

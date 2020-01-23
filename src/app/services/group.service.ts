import { Injectable } from "@angular/core";
import { IGroup } from "../interfaces/group.interface";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";

@Injectable({
  providedIn: "root"
})
export class GroupService {
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
    let configUrl = `${server.SERVER_URL}groups/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(groupId: string) {
    let configUrl = `${server.SERVER_URL}groups/${groupId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(group: IGroup) {
    group.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}groups`;
    return this.http.post(configUrl, group, { headers: this.headers });
  }

  public updateOne(groupId: string, group: IGroup) {
    let configUrl = `${server.SERVER_URL}groups/${groupId}`;
    return this.http.put(configUrl, group, {
      headers: this.headers
    });
  }

  public deleteOne(groupId: string) {
    let configUrl = `${server.SERVER_URL}groups/${groupId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}

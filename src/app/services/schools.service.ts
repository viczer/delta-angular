import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { server } from "./config";
import { AuthService } from "./auth.service";
import { IUser } from "../interfaces/user.interface";

import * as _ from "lodash";
@Injectable({
  providedIn: "root"
})
export class SchoolService {
  private headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: ""
  };

  private schoolId;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticated$.subscribe((status: IUser) => {
      if (!_.isEmpty(status)) {
        this.headers.Authorization = `bearer ${status.access_token}`;
        this.schoolId = status.schools[0];
      }
    });
  }

  public findAll() {
    let configUrl = `${server.SERVER_URL}schools`;
    return this.http.get(configUrl);
  }

  public findById(schoolId: string) {
    let configUrl = `${server.SERVER_URL}schools/${schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findOne() {
    let configUrl = `${server.SERVER_URL}schools/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }
}

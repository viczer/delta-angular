import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { server } from "./config";
import { IUser } from "../interfaces/user.interface";
import { IResponse } from "../interfaces/response.interface";

import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public authenticated$: BehaviorSubject<IUser> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    const loadedStatus = localStorage.getItem("auth_user") != "";
    if (loadedStatus) {
      this.authenticated$.next(JSON.parse(localStorage.getItem("auth_user")));
    }

    this.authenticated$.subscribe(status => {
      localStorage.setItem("auth", JSON.stringify(status));
    });
  }

  public login(username: string, password: string) {
    let configUrl = `${server.SERVER_URL}auth/login`;
    let user: IUser = {
      username,
      password
    };
    return this.http.post(configUrl, user);
  }

  public signup(user: IUser) {
    let configUrl = `${server.SERVER_URL}auth/signUp`;
    return this.http.post(configUrl, user);
  }

  public checkUsername(username: string) {
    let configUrl = `${server.SERVER_URL}auth/${username}`;
    return this.http.get(configUrl);
  }
}

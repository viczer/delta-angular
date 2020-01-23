import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { NbMenuItem } from "@nebular/theme";
import { NavigationService } from "./services/navigation.service";
import { IUser } from "./interfaces/user.interface";

import * as _ from "lodash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isAuthenticated: boolean;
  public user: IUser;
  private menuItems: NbMenuItem[] = [];

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {
    this.menuItems = this.navigationService.getMainMenu();
    this.authService.authenticated$.subscribe(status => {
      this.user = status;
      this.isAuthenticated = _.isEmpty(this.user) ? false : true;
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/user.interface";

import * as _ from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean;
  public user: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: NbSidebarService
  ) {
    this.authService.authenticated$.subscribe(status => {
      this.user = status;
      if (_.isEmpty(this.user)) {
        this.router.navigate(["/"]);
      }
      this.isAuthenticated = _.isEmpty(this.user) ? false : true;
    });
  }
  ngOnInit() {}

  toggleCompact() {
    this.sidebarService.toggle(true, "left");
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { IUser } from "../../../interfaces/user.interface";
import { SchoolService } from "src/app/services/schools.service";
import { IResponse } from "src/app/interfaces/response.interface";
import { ISchool } from "src/app/interfaces/school.interface";

import * as _ from "lodash";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input("user") user;
  public school = "Administración ";

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) {
    this.schoolService.findAll().subscribe(
      (response: IResponse) => {
        this.school += _.find(response.data, (o: any) => {
          return this.user.schools[0] == o._id;
        }).name;
      },
      error => {}
    );
  }

  ngOnInit() {}
}

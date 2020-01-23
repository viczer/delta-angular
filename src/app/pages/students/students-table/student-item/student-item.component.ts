import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { GroupService } from "../../../../services/group.service";
import { IResponse } from "../../../../interfaces/response.interface";
import { IGroup } from "../../../../interfaces/group.interface";

@Component({
  selector: "app-student-item",
  templateUrl: "./student-item.component.html",
  styleUrls: ["./student-item.component.scss"]
})
export class StudentItemComponent implements OnInit {
  @Input("student") student;
  @Input("size") size;
  @Input("mode") mode;

  public settingsActive = false;
  constructor(private router: Router, private groupService: GroupService) {}
  public loadSettings() {
    this.settingsActive = true;
  }

  navigate(id) {
    this.router.navigate(["alumnos", id]);
  }

  ngOnInit() {}
}

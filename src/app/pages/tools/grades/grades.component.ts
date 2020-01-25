import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { GradesService } from "../../../services/grades.service";
import { IResponse } from "src/app/interfaces/response.interface";

@Component({
  selector: "app-grades",
  templateUrl: "./grades.component.html",
  styleUrls: ["./grades.component.scss"]
})
export class GradesComponent {
  public grades = [];
  public student;
  public id: string = "";
  constructor(
    private gradesService: GradesService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.gradesService
        .findAllInStudent(this.id)
        .subscribe((response: IResponse) => {
          this.grades = response.data;
        });
    });
  }

  public handleReload() {
    setTimeout(() => {
      this.gradesService
        .findAllInStudent(this.id)
        .subscribe((response: IResponse) => {
          this.grades = response.data;
        });
    }, 300);
  }

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}

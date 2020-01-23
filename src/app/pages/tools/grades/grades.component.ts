import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { GradesService } from "../../../services/grades.service";

@Component({
  selector: "app-grades",
  templateUrl: "./grades.component.html",
  styleUrls: ["./grades.component.scss"]
})
export class GradesComponent {
  public grades = [];
  public student;

  constructor(
    private gradesService: GradesService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}

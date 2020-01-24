import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { IResponse } from "src/app/interfaces/response.interface";
import { SchoolService } from "src/app/services/schools.service";
import { GroupService } from "src/app/services/group.service";
import { AcademicsService } from "src/app/services/academics.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  public student;
  public id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private groupService: GroupService,
    private academicsService: AcademicsService,
    private router: Router
  ) {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  public handleDelete() {
    this.studentService.deleteOne(this.id).subscribe((response: IResponse) => {
      this.router.navigate(["alumnos"]);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.studentService.findById(this.id).subscribe((response: IResponse) => {
        this.schoolService
          .findById(response.data.schools[0])
          .subscribe((subresponse: IResponse) => {
            response.data.schools[0] = subresponse.data.name;
          });

        this.groupService
          .findById(response.data.group)
          .subscribe((subresponse: IResponse) => {
            response.data.group = subresponse.data.name;
          });

        this.academicsService
          .findById(response.data.program)
          .subscribe((subresponse: IResponse) => {
            response.data.program = subresponse.data.name;
          });

        this.student = response.data;
      });
    });
  }
}

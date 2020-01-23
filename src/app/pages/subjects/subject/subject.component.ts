import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { SubjectsService } from "../../../services/subjects.service";
import { IResponse } from "../../../interfaces/response.interface";
import { GradesService } from "../../../services/grades.service";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"]
})
export class SubjectComponent implements OnInit {
  public subject;
  public students = [];
  public id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectsService,
    private gradesService: GradesService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.subjectService.findById(this.id).subscribe((response: IResponse) => {
        this.subject = response.data;
        return this.gradesService
          .findAllInSubject(this.id)
          .subscribe((response: IResponse) => {
            this.students = response.data;
          });
      });
    });
  }
}
